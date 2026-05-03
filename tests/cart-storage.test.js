const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const scriptPath = path.join(__dirname, '..', 'js', 'script.js');

class Element {
    constructor(id) {
        this.id = id;
        this.style = {};
        this.classList = {
            add() {},
            remove() {}
        };
        this.listeners = {};
        this.innerHTML = '';
        this.textContent = '';
    }

    addEventListener(type, listener) {
        this.listeners[type] = listener;
    }

    click() {
        this.listeners.click?.({ preventDefault() {} });
    }

    reset() {}
}

function createStorage() {
    const values = new Map();

    return {
        getItem(key) {
            return values.has(key) ? values.get(key) : null;
        },
        setItem(key, value) {
            values.set(key, String(value));
        },
        removeItem(key) {
            values.delete(key);
        }
    };
}

function loadScript() {
    const elements = new Map();
    const storage = createStorage();
    let domReady;

    const document = {
        documentElement: { style: {} },
        addEventListener(type, listener) {
            if (type === 'DOMContentLoaded') {
                domReady = listener;
            }
        },
        getElementById(id) {
            if (!elements.has(id)) {
                elements.set(id, new Element(id));
            }
            return elements.get(id);
        },
        querySelector() {
            return null;
        }
    };

    const sandbox = {
        document,
        console,
        alert() {},
        localStorage: storage,
        window: { localStorage: storage }
    };

    vm.runInNewContext(fs.readFileSync(scriptPath, 'utf8'), sandbox, {
        filename: scriptPath
    });

    return { domReady, elements, storage, sandbox };
}

const { domReady, elements, storage, sandbox } = loadScript();

assert.equal(typeof domReady, 'function');
domReady();

elements.get('add-to-cart-button').click();

assert.deepEqual(JSON.parse(storage.getItem('pictureThisCart')), [
    {
        id: 'picture-this-card-game',
        name: 'Picture This! Card Game',
        price: 24.99,
        quantity: 1
    }
]);

sandbox.renderCart();

assert.match(elements.get('cart').innerHTML, /Picture This! Card Game/);
assert.match(elements.get('cart').innerHTML, /24\.99 CAD/);
