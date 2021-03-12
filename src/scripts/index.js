import rangeSlider from 'rangeslider-pure'

window.addEventListener('load', () => {

    let data = {
        select: null,
        email: null,
        name: null,
        range: null,
        file: null
    }

    const sendData = (type, value) => {
        return data[type] = value
    }

    const select = document.querySelector('.select--type')
    const selectCurrent = document.querySelector('.select__current > span')
    const selectItems = document.querySelectorAll('.select__item')

    const handleOpenSelect = () => {
        select.addEventListener('click', () => {
            select.classList.toggle('select--active')
        })
    }

    handleOpenSelect()

    const handleChangeValue = () => {
        selectItems.forEach(item => {
            item.addEventListener('click', () => {
                selectCurrent.textContent = item.textContent
                sendData('select', item.getAttribute('data-value'))
            })
        })
    }

    handleChangeValue()

    const range = document.querySelector('#range')
    const rangeValue = document.querySelector('.progress__value')

    rangeSlider.create(range, {
        polyfill: true,   // Boolean, if true, custom markup will be created
        rangeClass: 'rangeSlider',
        disabledClass: 'rangeSlider--disabled',
        fillClass: 'rangeSlider__fill',
        bufferClass: 'rangeSlider__buffer',
        handleClass: 'rangeSlider__handle',
        startEvent: ['mousedown', 'touchstart', 'pointerdown'],
        moveEvent: ['mousemove', 'touchmove', 'pointermove'],
        endEvent: ['mouseup', 'touchend', 'pointerup'],
        min: 0,      // Number , 0
        max: 100,      // Number, 100
        step: 1,     // Number, 1
        value: null,    // Number, center of slider
        buffer: null,     // Number, in percent, 0 by default
        stick: null,       // [Number stickTo, Number stickRadius]
        borderRadius: 10,  // Number, if you use buffer + border-radius in css for looks good,
        onSlide: function (position, value) {
            sendData('range', (value * 100).toFixed(0))
            rangeValue.textContent = `${(value * 100).toFixed(0)}%`
        }
    })

    const hamburger = document.querySelector('.hamburger')
    const menuList = document.querySelector('.nav__list')

    const handleOpenMenu = () => {
        hamburger.addEventListener('click', () => {
            menuList.classList.toggle('nav__list--active')
            hamburger.classList.toggle('hamburger--active')
        })
    }

    handleOpenMenu()

    const handleGetInputValue = (current) => {
        let id = current.getAttribute('id')

        // const error = document.querySelector('.error')

        const handleValidateEmail = (email) => {
            const rgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const res = rgx.test(String(email).toLowerCase())

            if (res) {
                // error.textContent = ''
                return true
            } else {
                // error.textContent = 'Error email validation'
                return false
            }
        }

        current.addEventListener('input', (event) => {

            let value = event.target.value

            switch (id) {
                case 'email': handleValidateEmail(value) ? sendData(id, value) : false
                    break
                case 'name': sendData(id, value)
                    break
                default: return
            }
        })
    }

    const email = document.querySelector('#email')
    const name = document.querySelector('#name')

    handleGetInputValue(email)
    handleGetInputValue(name)

    const handleGetImage = () => {

        const file = document.querySelector('#file')

        file.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {

                const file = event.target.files[0]

                const FR = new FileReader()

                FR.addEventListener('load', event => {
                    console.log(event)
                    sendData('file', event.target.result)
                })

                FR.readAsDataURL(file)
            }
        })
    }

    handleGetImage()

    const button = document.querySelector('.button--form')

    button.addEventListener('click', (event) => {
        event.preventDefault()
        console.log(data)
        // send on backend
    })
})
