var engine;
var boxes =[]
var index = 0
var colors = "eae4e9-fff1e6-fde2e4-fad2e1-e2ece9-bee1e6-f0efeb-dfe7fd-cddafd".split("-").map(a=>"#"+a)

let myFont;

function preload() {
  img = loadImage('illustration.png');
  noiseImg = loadImage('noise.png');

  myFont = loadFont('delagothicone-regular-webfont.ttf');

}

var words = ["哈囉","期待嗎！","這個卡片","感覺需要","很努力看","><","不過","一年一次嘛","委屈一下","做賀卡","真是個麻煩","又溫馨的","活動","寫卡片時","都會回想","我們怎麼","兜在一起的","然後感慨","遇見彼此","真是太好了！","新的一年","也麻煩","多多照顧！","最後","新年快樂","希望你還喜歡","這個卡片！","有什麼想講的","都放馬過來吧","><","><","><","><","><","><","以為沒了？","trivago","...","真的沒了","哈哈哈","下台","枻鞠躬","ByeBye"]
// 分隔用 ","


function setup() {	
  
    pixelDensity(1)
    
	createCanvas(windowWidth, windowHeight);
  
    
  
	let {Engine,Bodies,World,Mouse,MouseConstraint}= Matter
     fill(255,143,163)
	let ground= Bodies.rectangle(width/2,height+40,width,80,{isStatic:true})
	let wallLeft= Bodies.rectangle(0-10,height/2,20,height,{isStatic:true})
    let wallRight= Bodies.rectangle(width+10,height/2,10,height,{isStatic:true})
    // let square= Bodies.rectangle(width/2,height*2/3,width/2,height*2/3,{isStatic:true})

   
    engine = Engine.create();
  
    // var mouse = Mouse.create(canvas.elt)
    // var mouseConstraint = MouseConstraint.create(engine,{mouse:mouse})
    
    // World.add(engine.world,mouseConstraint)    
  
	boxes.push(ground)
    boxes.push(wallLeft)
    boxes.push(wallRight)
    // boxes.push(square)
	
	World.add(engine.world, [ground,wallLeft,wallRight,]);
	Matter.Runner.run(engine)
		
	
}




function generateNewBox(){
	
	let {Engine,Bodies,World,Constraint}= Matter
	var sz = random([80,90])
    let box = Bodies.polygon(mouseX,mouseY,random(4,6),random([1.8*sz,2*sz,1.3*sz]),{chamfer: { radius: 30 } });
    // let box = Bodies.rectangle(mouseX,mouseY,random([4*sz,3*sz]),random([1.6*sz,2*sz,0.6*sz]),{chamfer: { radius: 20 } });
	box.color = random(colors)
	box.char = words[index]
	box.size = random(60,80)

	
	
	// var constraint = Constraint.create({
	// 		// pointA: {x:random(width),y:random(height)},
	// 	  bodyA: boxes.slice(-1)[0],
	// 		bodyB: box,
	// 		length: 60,
	// 		stiffness: 0.1,
	// 		// damping: 0.05
	// });
	// World.add(engine.world, [constraint]);

	// console.log(box)
	boxes.push(box)
	World.add(engine.world, box);
}

function draw() {
  
   g= map(mouseX,0,width,245,250)
   b= map(mouseY,0,height,250,244)
   background('#ff8fa3');
   push()
	
	push()
		blendMode(SOFT_LIGHT)
		image(noiseImg,0,0,width,height)
        // tint(255, 1)
	pop()
    // background(30)
  
	fill(0)
	

	for(let box of boxes){
      
		var vertices = box.vertices;
		fill(box.color || 200)
		// noFill()
		noStroke()
		beginShape();
		for (let vert of vertices) {
			vertex(vert.x, vert.y);
		}
		endShape(CLOSE);
		push()
			translate(box.position.x,box.position.y)
			rotate(box.angle)
			fill(20)
			noStroke()
            textFont(myFont);
			let useTextSize = box.size*0.5
			textSize(useTextSize)
			textAlign(CENTER)
			textStyle(BOLD)
			text(box.char || "><",0,useTextSize*0.5 )
		pop()
	}
   
	// //text
	//  fill('red');
	//  noStroke();
	// textAlign(CENTER)
	// textFont(font1);
	// textStyle(BOLD);
	// textSize(width/10);
	// text(' 謹 賀 新 年 ',width/2,2*height/20);
	// // rotate( )
     
   imageMode(CORNERS);
   image(img, 0,height-(windowWidth/16*9),windowWidth,windowHeight);
   // img.resize(width/4,0)
   
    document.ontouchmove = function(event) {
    event.preventDefault();
      }
  	

}

 function mouseClicked(){
 	generateNewBox()
    index=index+1
 }

function touchStarted() {
  generateNewBox()
  index=index+1
}

