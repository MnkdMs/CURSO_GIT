export class BotonComprar extends HTMLElement {

    static get observedAttributes() {
        return ['state'];
    }

    get template() {
        return `
        <style>
            :host {
                display: block;
                margin: 1rem;
                --color-boton: ${this.color};
                --aire-boton: 1rem;
            }
            button {
                background-color: var(--color-boton);
                border:0;
                border-radius: 5px;
                color: white;
                padding: var(--aire-boton);
                text-transform: uppercase;
            }
        </style>
        <div>
           <button><slot name="slot1">Comprar</slot></button>
        </div>
        <p>
        <p><slot name="slot2">Gracias por confiar en nosotros</slot></p>
        </p>   
        `
    }

    constructor() {
        super()
        console.log('Instanciado el boton')
        this.color = 'gray'
    }


    connectedCallback(){
        console.log('Renderizado botón')
        this.shadow = this.shadow ? this.shadow:
         this.attachShadow({mode:'open'})
        this.shadow.innerHTML = this.template
        this.btnComprar = this.shadow.querySelector('button')
        this.btnComprar.addEventListener('click', this.onClick.bind(this)) //Siempre que un manejador empieza por this acaba por bind (this)
    }

  // Defino una función callback para el
    // instante del ciclo de vida "attributeCanged"

    attributeChangedCallback (attr, oldVal, newVal) {
        console.log('Cambiado ', attr, ' al valor: ', newVal);
        if(newVal) {
            this.color = 'orange'
        } else {
            this.color = 'gray'
        }
        this.connectedCallback()

    };

    onClick() {
        if (this.color == 'orange' ) {
            console.log('Enviando datos', this.id)
            this.dispatchEvent(
                new CustomEvent('setOperacion', {operacion: this.id})
            )
        }
    }
}

customElements.define('boton-comprar', BotonComprar)