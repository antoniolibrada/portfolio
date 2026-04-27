import { ConstellationField } from './constellation'

const canvas = document.createElement('canvas')
canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%'
document.body.appendChild(canvas)

const field = new ConstellationField()
field.mount(canvas)
