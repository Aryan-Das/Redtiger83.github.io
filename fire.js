function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = 1000

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})
addEventListener('mousedown',event =>{
    var color = randomColor(['red','blue','purple','orange','green','black','white'])
    objects.push(new Ball(canvas.width / 2,canvas.height - 50,9,color))
  
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects


function Ball(x, y, radius, color) {
    
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
        y: 3,
        x: randomIntFromRange(-10,10)
    }
}

Ball.prototype.draw = function() {
    c.save()
    //could also be a square. 
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)//comment out if square
    c.fillStyle = this.color
    //c.fillRect(this.x,this.y,this.radius,this.radius)//comment out if circle
    c.shadowColor = this.color
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

Ball.prototype.update = function() {
    this.draw()
    //this.velocity.x -= 0.5
    
    if(this.y > 300){
        this.velocity.y += 0.5
        this.y -= this.velocity.y
        this.x -= this.velocity.x
    }else {
        this.explode()
    }
}
Ball.prototype.explode = function() {
    
    
    this.radius -= 3
    for(let i = 0;i < 20; i++){
        
        miniStars.push(new Particle(this.x,this.y,2))

    

}
    


}
function Particle(x,y,radius){
    Ball.call(this,x,y,radius)
    this.color = randomColor(['red','blue','purple','orange','green','black'])
    this.velocity = {
        x: randomIntFromRange(-5,5),
        y: randomIntFromRange(-5,5)
    }
    this.friction = 0.8
    this.gravity = 0.1
    this.ttl = 50
    this.opacity = 1
   
}
Particle.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    if (this.color == 'red'){
        c.fillStyle = `rgba(255,0,0,${this.opacity})`
        c.shadowColor = `rgba(255,0,0,${this.opacity})`

    }
    if(this.color == 'blue'){
        c.fillStyle = `rgba(0,0,255,${this.opacity})`
        c.shadowColor = `rgba(0,0,255,${this.opacity})`

    }
    if(this.color == 'purple'){
        c.fillStyle = `rgba(255,0,255,${this.opacity})`
        c.shadowColor = `rgba(255,0,255,${this.opacity})`
 

    }
    if(this.color == 'orange'){
        c.fillStyle = `rgba(255,165,0,${this.opacity})`
        c.shadowColor = `rgba(255,165,0,${this.opacity})`

    }
    if(this.color == 'green'){
        c.fillStyle = `rgba(0,255,0,${this.opacity})`
        c.shadowColor = `rgba(0,255,0,${this.opacity})`

    }
    if(this.color == 'blue'){
        c.fillStyle = `rgba(0,0,0,${this.opacity})`
        c.shadowColor = `rgba(0,0,0,${this.opacity})`

    }
    
    c.shadowBlur = 20
    
   
    c.fill()
    c.closePath()
    c.restore()
}
Particle.prototype.update = function() {
    this.draw()
    if( this.y + this.radius + this.velocity.y  > canvas.height){
        this.velocity.y = -this.velocity.y * this.friction


    } else{
        this.velocity.y += this.gravity
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.ttl -= 1
    this.opacity -= 1 / this.ttl
}
// Implementation
let objects
const backgroundGradient = c.createLinearGradient(0,0,0,canvas.height)
backgroundGradient.addColorStop(0,'#171e26')
backgroundGradient.addColorStop(1,'#3f586b')
function init() {
    
    objects = []
    miniStars = []
    miniStars.forEach((Particle,index) => {
        Particle.update()
        if(Particle.ttl == 0){
            miniStars.splice(index,1)
        }
    })

    for (let i = 0; i < 1; i++) {
        
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'grey'
    c.fillRect(0,canvas.height - 25,canvas.width,25)
    objects.forEach((object,index) => {
        object.update()
        if(object.radius == 0){
            objects.splice(index,1)

        }
    })
    miniStars.forEach((Particle,index) => {
        Particle.update()
        if(Particle.ttl == 0){
            miniStars.splice(index,1)

        }
    })
    c.fillStyle = 'white'
    c.fillRect((canvas.width / 2) - 12,canvas.height - 50,24,50)
    c.fillStyle = 'red'
    c.fillRect((canvas.width / 2) - 16,canvas.height - 50,32,10)
    c.fillRect((canvas.width / 2) - 12,canvas.height - 30,24,10)
    c.fillRect((canvas.width / 2) - 12,canvas.height - 10,24,10)
    c.font = "50px Verdana";
    c.textAlign = "center"
    c.fillStyle = '#E3EAEF'
    c.fillText("Click to make fireworks!",canvas.width / 2,50)
    c.font = "10px Arial" 
    c.fillStyle = 'white'
    c.fillText('fireworks',mouse.x,mouse.y)
   
}

init()
animate()
