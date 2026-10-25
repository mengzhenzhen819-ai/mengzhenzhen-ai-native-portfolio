import { useEffect, useRef } from "react";

// Folded shard stream with the portfolio's #FDC700 yellow, amber facets
// and pale-gold highlights; slow transport and gentle pointer repulsion.
const VERTEX = `#version 300 es
precision highp float;
layout(location=0) in vec3 aCorner;
layout(location=1) in vec4 aSeed;
uniform float uTime;
uniform float uAspect;
uniform float uParticleScale;
uniform vec3 uPointer;
out vec3 vNormal;
out vec3 vPosition;
out vec2 vLocal;
out float vDepth;
out float vSeed;
const float PI=3.14159265359;
void main(){
  float phase=fract(aSeed.x+uTime*.102/length(vec2(2.44*uAspect,2.236)));
  float p=phase;
  vec3 direction=normalize(vec3(2.44*uAspect,
    cos((p*1.72-.2)*PI)*1.72*PI*.54+cos(p*PI*3.)*PI*3.*.12,
    -sin(p*PI*2.-.7)*PI*2.*.22));
  vec2 normal=normalize(vec2(-direction.y,direction.x));
  float signedLane=aSeed.y*2.-1.;
  float lane=sign(signedLane)*pow(abs(signedLane),.72);
  float widthProfile=.46+pow(max(sin(p*PI),0.),.72)*.54;
  float laneWidth=(lane*.56+sin(p*37.699+aSeed.z*12.)*.055*.522)*widthProfile;
  vec3 position=vec3(mix(-uAspect*1.22,uAspect*1.22,p),
    sin((p*1.72-.2)*PI)*.54+sin(p*PI*3.)*.12,
    cos(p*PI*2.-.7)*.22);
  position+=vec3(normal*laneWidth,(aSeed.z*2.-1.)+cos(p*31.416+aSeed.y*8.)*.06*.522);
  vec2 delta=position.xy-uPointer.xy;
  float influence=exp(-dot(delta,delta)/.11)*uPointer.z;
  vec2 lateral=delta-direction.xy*dot(delta,direction.xy);
  position.xy+=lateral*influence*.32;
  direction=normalize(direction+vec3(lateral*influence*.5,0.));
  vec3 side=normalize(cross(vec3(0.,0.,1.),direction));
  vec3 facing=cross(direction,side);
  float roll=aSeed.y*PI*2.+uTime*.102*mix(-1.5,1.7,aSeed.z)*2.4;
  vec3 bankSide=side*cos(roll)+facing*sin(roll);
  vec3 bankFace=facing*cos(roll)-side*sin(roll);
  float depthScale=mix(.56,1.58,clamp(position.z*.62+.5,0.,1.));
  float sizeMix=.46+aSeed.w*.58+pow(aSeed.w,12.)*1.55;
  float size=.0132*.624*sizeMix*depthScale*uParticleScale;
  vec3 local=aCorner;
  local.x*=mix(.72,1.08,aSeed.y);
  local.y*=mix(.82,1.12,aSeed.z);
  vec3 world=position+direction*local.y*size*1.273+bankSide*local.x*size*.72+bankFace*local.z*size*.72;
  float perspective=1./max(.62,1.-world.z*.34);
  gl_Position=vec4(world.xy*2.05/vec2(uAspect,1.)*perspective,0.,1.);
  float facet=gl_VertexID<3?-1.:1.;
  vNormal=bankSide*facet*.394903+bankFace*.918723;
  vPosition=position;
  vLocal=aCorner.xy;
  vDepth=clamp(position.z*.62+.5,0.,1.);
  vSeed=aSeed.y;
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vPosition;
in vec2 vLocal;
in float vDepth;
in float vSeed;
out vec4 outColor;
float softbox(vec3 direction,vec2 center,vec2 size){
  vec2 q=abs((direction.xy-center)/size); q*=q; q*=q;
  return exp(-q.x-q.y);
}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
  vec3 base=vec3(.9922,.7804,0.);
  vec3 accent=vec3(.9098,.6588,.1255);
  vec3 highlight=vec3(1.,.953,.69);
  vec3 n=normalize(vNormal);
  vec3 view=normalize(vec3(-vPosition.xy*.08,1.));
  vec3 key=normalize(vec3(-.321,.49,.845));
  vec3 reflection=reflect(-view,n);
  float broad=softbox(reflection,vec2(-.34,.28),vec2(.658,.358));
  float strip=softbox(reflection,vec2(.48,-.08),vec2(.12,.72));
  float diffuse=max(dot(n,key),0.);
  float specular=pow(max(dot(n,normalize(key+view)),0.),53.82);
  float fresnel=pow(1.-max(dot(n,view),0.),4.);
  float fog=smoothstep(-.68,.58,vPosition.z);
  vec3 color=mix(accent*.52,base,fog)*(.1+diffuse*.3)*mix(.76,1.,smoothstep(-.08,.08,n.x));
  color+=highlight*(broad*.6024*1.064+specular*mix(.82,1.,vDepth));
  color+=accent*strip*(.12+fresnel*.42);
  color+=mix(base,accent,vSeed)*fresnel*.2234;
  color+=accent*(broad*.045+fresnel*.075)*.459;
  float crease=(1.-smoothstep(.015,.11,abs(vLocal.x)))*(1.-smoothstep(.78,1.,abs(vLocal.y)));
  color+=highlight*(.08+specular*.22)*crease;
  float edge=1.-abs(vLocal.y)-abs(vLocal.x)/.72;
  float coverage=smoothstep(0.,max(fwidth(edge)*2.,.0001),edge);
  outColor=vec4(aces(color*mix(.42,1.,fog)*.92*1.12),mix(.58,.97,fog)*coverage);
}`;

export default function HeroAtmosphere() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || motion.matches) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
    if (!gl) return;
    const shaders = [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].map((type, i) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, i ? FRAGMENT : VERTEX);
      gl.compileShader(shader);
      return shader;
    });
    const program = gl.createProgram();
    shaders.forEach(shader => gl.attachShader(program, shader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader)); return;
    }
    gl.useProgram(program);
    const mesh = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,1,.34,-.72,0,0,0,-1,.34,0,1,.34,0,-1,.34,.72,0,0]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
    const coarse = matchMedia("(pointer: coarse)").matches;
    const count = coarse ? 720 : 1760;
    let random = 8271;
    const seeds = Float32Array.from({length: count*4}, () => {
      random = (Math.imul(random,1664525)+1013904223)>>>0; return random/4294967296;
    });
    const seedBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,seedBuffer); gl.bufferData(gl.ARRAY_BUFFER,seeds,gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1,4,gl.FLOAT,false,0,0); gl.vertexAttribDivisor(1,1);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    const time = gl.getUniformLocation(program,"uTime");
    const aspect = gl.getUniformLocation(program,"uAspect");
    const particleScale = gl.getUniformLocation(program,"uParticleScale");
    const pointer = gl.getUniformLocation(program,"uPointer");
    const point = {x:0,y:0,active:0};
    const smooth = {...point};
    let width=1,height=1,frame=0,elapsed=17,last=0,visible=true,disposed=false;
    const resize = () => {
      const bounds=canvas.getBoundingClientRect(); width=bounds.width; height=bounds.height;
      const dpr=Math.min(devicePixelRatio,coarse?1.25:1.5);
      canvas.width=Math.max(1,Math.round(width*dpr)); canvas.height=Math.max(1,Math.round(height*dpr));
      gl.viewport(0,0,canvas.width,canvas.height);
      // Extending the field should not magnify the reference's particle sizes.
      gl.uniform1f(particleScale,window.innerHeight/Math.max(height,1));
    };
    const draw = stamp => {
      frame=0;
      if(disposed || !visible || document.hidden || motion.matches) {last=0;return;}
      const delta=last?Math.min((stamp-last)/1000,.05):0; last=stamp; elapsed+=delta;
      smooth.x+=(point.x-smooth.x)*.09; smooth.y+=(point.y-smooth.y)*.09;
      smooth.active+=(point.active-smooth.active)*.07;
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(time,elapsed); gl.uniform1f(aspect,width/height);
      gl.uniform3f(pointer,smooth.x,smooth.y,smooth.active);
      gl.drawArraysInstanced(gl.TRIANGLES,0,6,count);
      frame=requestAnimationFrame(draw);
    };
    const resume=()=>{if(!frame && !disposed)frame=requestAnimationFrame(draw);};
    const move=e=>{
      if(coarse || !visible || document.hidden)return;
      const rect=canvas.getBoundingClientRect();
      point.active=e.clientY>=rect.top && e.clientY<=rect.bottom?1:0;
      point.x=((e.clientX-rect.left)/width*2-1)*(width/height)/2.05;
      point.y=(1-(e.clientY-rect.top)/height*2)/2.05;
    };
    const leave=()=>{point.active=0;};
    const preference=()=>{if(motion.matches){gl.clear(gl.COLOR_BUFFER_BIT);}else resume();};
    const observer=new ResizeObserver(resize); observer.observe(canvas);
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume();}); intersection.observe(canvas);
    window.addEventListener("pointermove",move,{passive:true}); window.addEventListener("blur",leave);
    document.addEventListener("visibilitychange",resume); motion.addEventListener("change",preference);
    resize(); resume();
    return ()=>{
      disposed=true; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
      window.removeEventListener("pointermove",move); window.removeEventListener("blur",leave);
      document.removeEventListener("visibilitychange",resume); motion.removeEventListener("change",preference);
      gl.deleteBuffer(mesh); gl.deleteBuffer(seedBuffer); gl.deleteProgram(program); shaders.forEach(shader=>gl.deleteShader(shader));
    };
  }, []);
  return <div className="hero-atmosphere" aria-hidden="true"><canvas ref={canvasRef} className="hero-shard-stream" /></div>;
}
