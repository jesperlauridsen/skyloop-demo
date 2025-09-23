(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function H(s,e,t,i,n,a,o){const r=new THREE.Group;return new THREE.GLTFLoader().load("./assets/world3.glb",h=>{const l=h.scene;l.scale.set(2.5,2.5,2.5),l.name="earth",l.traverse(function(g){g.isMesh&&(g.castShadow=!0)}),console.log("earth",l);const m=new THREE.MeshStandardMaterial({color:16777215,transparent:!0,opacity:1,roughness:1,metalness:0,fog:!1,side:THREE.DoubleSide});l.children.forEach((g,C)=>{g.name.includes("cloud")&&(g.material=m)}),l.children.forEach((g,C)=>{g.name.includes("rainbow")&&(g.material.fog=!1,g.material.side=THREE.DoubleSide)}),new THREE.MeshStandardMaterial({color:35529,transparent:!1,refractionRatio:.97,opacity:1,roughness:.3,metalness:.5});const u=new THREE.SpotLight(16777215,1,1e3,Math.PI/2,1,2);u.name="sun-softlight",u.position.set(-120,0,-120),n.add(u);const p=new THREE.IcosahedronGeometry(30,2,2),E=new THREE.ShaderMaterial({side:THREE.BackSide,blending:THREE.AdditiveBlending,transparent:!1,uniforms:{c:{value:.4},p:{value:6},viewVector:{value:a},glowColor:{value:new THREE.Color(16775201)},time:{value:o},intensity:{value:1}},vertexShader:`	
				uniform vec3 viewVector;
				uniform float c;
				uniform float p;
				uniform float time; // Use time for dynamic effects
				varying float intensity;
				void main() 
				{
					vec3 vNormal = normalize( normalMatrix * normal );
					vec3 vNormel = normalize( normalMatrix * viewVector );

					// Add a flare effect using sin(time), scaling large time values
					float scaledTime = mod(time, 10000.0) * 0.0001; // Normalize time
					float flare = 0.5 + 0.5 * sin(scaledTime * 6.2831); // Oscillates between 0 and 1
					intensity = pow(c - dot(vNormal, vNormel), p) * flare;

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}
				`,fragmentShader:`
				uniform vec3 glowColor; // Input glow color
				varying float intensity; // Intensity of the glow
				void main() 
				{
					// Scale intensity to clamp between 0 and 1
					float scaledIntensity = clamp(intensity, 0.0, 1.0);

					// Calculate the RGB glow, modulating by the intensity
					vec3 glow = glowColor * scaledIntensity;

					// Set alpha to 1.0 for solid color, independent of intensity
					gl_FragColor = vec4(glowColor, scaledIntensity);
				}
				`}),f=new THREE.Mesh(p,E);f.name="sun-glow",f.position.set(-120,0,-120),n.add(f);const w=new THREE.IcosahedronGeometry(8,2,2),v=new THREE.IcosahedronGeometry(10,2,2),b=new THREE.MeshPhongMaterial({color:11052182,opacity:1,transparent:!0,flatShading:!0}),T=new THREE.ShaderMaterial({side:THREE.BackSide,blending:THREE.AdditiveBlending,transparent:!1,uniforms:{c:{value:.4},p:{value:6},viewVector:{value:a},glowColor:{value:new THREE.Color(6906705)},time:{value:o},intensity:{value:1}},vertexShader:`	
				uniform vec3 viewVector;
				uniform float c;
				uniform float p;
				uniform float time; // Use time for dynamic effects
				varying float intensity;
				void main() 
				{
					vec3 vNormal = normalize( normalMatrix * normal );
					vec3 vNormel = normalize( normalMatrix * viewVector );

					// Add a flare effect using sin(time), scaling large time values
					float scaledTime = mod(time, 10000.0) * 0.0001; // Normalize time
					float flare = 0.5 + 0.5 * sin(scaledTime * 6.2831); // Oscillates between 0 and 1
					intensity = pow(c - dot(vNormal, vNormel), p) * flare;

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}
				`,fragmentShader:`
				uniform vec3 glowColor; // Input glow color
				varying float intensity; // Intensity of the glow
				void main() 
				{
					// Scale intensity to clamp between 0 and 1
					float scaledIntensity = clamp(intensity, 0.0, 1.0);

					// Calculate the RGB glow, modulating by the intensity
					vec3 glow = glowColor * scaledIntensity;

					// Set alpha to 1.0 for solid color, independent of intensity
					gl_FragColor = vec4(glowColor, scaledIntensity);
				}
				`}),y=new THREE.Mesh(w,b),M=new THREE.Mesh(v,T);M.name="moon-glow",y.position.set(120,0,120),M.position.set(120,0,120),n.add(M);const x=new THREE.DirectionalLight(9079434,.3);x.name="moon",x.position.set(120,0,120),n.add(x);const S=new THREE.AmbientLight(16777215,.1);S.name="ambient-light",n.add(S),r.add(l)},void 0,h=>{console.error("Error loading GLB file:",h)}),r.name=t,r.userData={level:e,name:t,rings:i.points,achievements:i.achievements,worldBackDrop:8900331},r}function L(s,e,t,i){const n=new THREE.Group;return new THREE.GLTFLoader().load("./assets/mars.glb",o=>{const r=o.scene;r.scale.set(2.5,2.5,2.5),r.name="mars",r.traverse(function(h){h.isMesh&&(h.castShadow=!0)});const d=new THREE.ShaderMaterial({side:THREE.FrontSide,blending:THREE.AdditiveBlending,transparent:!1,uniforms:{time:{value:i},resolution:{value:new THREE.Vector2(800,800)},amplitude:{value:5.5}},vertexShader:`	

				uniform float time; // Use time for dynamic effects
				varying vec2 vUv;

				void main() 
				{
					    float displacement = sin(time * 50.0 + position.x * 2.0 + position.y * 2.0) * 0.1;
						vec3 newPosition = position + normal * displacement * 0.5; // Reduce displacement factor
						gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
				}
				`,fragmentShader:`

				uniform float time;
				uniform vec2 resolution;
				uniform float amplitude;

				varying vec2 vUv;
 
				void main() 
				{
					vec2 uv = 3.0 * vUv.xy;

					for (float i = 1.0; i < 20.0; i++) {
						uv.x += 0.6 / i * sin(i * 2.5 * uv.y + (time / 10.0));
						uv.y += 0.6 / i * cos(i * 1.5 * uv.x + (time / 10.0));
					}

					gl_FragColor = vec4(0.05 / abs(sin(time / 1.0 - uv.y + uv.x)),
										0.1 / abs(sin(time - uv.y - uv.x)),
										0.2 / abs(sin(time - uv.y - uv.x)),
										1.0);
				    
					gl_FragColor = vec4(0.3, 0.5, 0.3, .3);
				}
				`});r.children[0].material=d,n.add(r)},void 0,o=>{console.error("Error loading GLB file:",o)}),n.name=e,n.userData={level:s,name:e,rings:t.points,achievements:t.achievements,worldBackDrop:8900331},n}function D(s,e,t,i){const o=Math.random()*16777215+0,r=new THREE.SphereGeometry(s,160,160),d=new THREE.MeshPhongMaterial({color:o,shininess:100}),h=new THREE.Mesh(r,d);h.position.set(0,0,0),h.receiveShadow=!0;const l=new THREE.Group;for(let m=0;m<100;m++){const u=A(s);l.add(u)}return l.add(h),l.name=t,l.userData={level:e,name:t,rings:i.points,achievements:i.achievements,worldBackDrop:Math.floor(Math.random()*16777215)},l}function A(s){const a=Math.random()*10+5,o=Math.random()*16777215+0,r=a*.2/4,d=a*.05/4,h=a*.8/4,l=a*.4/4,m=Math.random()*Math.PI*2,u=Math.random()*Math.PI,p=Math.sin(u)*Math.cos(m)*s,E=Math.cos(u)*s,f=Math.sin(u)*Math.sin(m)*s,w=new THREE.Vector3(p,E,f),v=new THREE.Group,b=new THREE.CylinderGeometry(d,d,r,8),T=new THREE.MeshPhongMaterial({color:o}),y=new THREE.Mesh(b,T);y.position.y+=r/2,y.castShadow=!0,y.receiveShadow=!0;const M=new THREE.ConeGeometry(l,h,8),x=new THREE.MeshPhongMaterial({color:o}),S=new THREE.Mesh(M,x);S.position.y+=r+h/2,S.castShadow=!0,S.receiveShadow=!0,v.add(y),v.add(S),v.position.copy(w);const g=w.clone().normalize(),C=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),g);return v.quaternion.copy(C),v}function B(s,e,t){const i=new THREE.Group,n=1,a=1,o=.01,r=64,d=new THREE.CylinderGeometry(n,a,o,r),h=1,l=.06,m=32,u=32,p=new THREE.TorusGeometry(h,l,m,u),E=`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,f=`
	uniform vec2 resolution;
    uniform float time;
    varying vec2 vUv;
    uniform bool useRainbowColors; // New boolean uniform

    float random(float seed) {
        return fract(sin(seed) * 43758.5453);
    }

    void main() {
		vec2 uv = vUv;

		// Calculate the distance from the center of the UV coordinates
		vec2 center = vec2(0.5);
		vec2 offset = uv - center;
		float distance = length(offset);
		
		// Apply rotation to the UV coordinates based on time
		float rotationSpeed = 2.5; // Adjust the rotation speed as desired
		float rotationAngle = time * -rotationSpeed;
		vec2 rotatedUV = vec2(
			offset.x * cos(rotationAngle) - offset.y * sin(rotationAngle),
			offset.x * sin(rotationAngle) + offset.y * cos(rotationAngle)
		);
		
		// Add the rotated UV coordinates back to the center to maintain the position
		vec2 finalUV = center + rotatedUV;
		
		// Calculate the angle based on the UV coordinates and time
		float angle = atan(finalUV.y - 0.5, finalUV.x - 0.5);
		
		// Calculate the rotation factor based on the distance from the center
		float rotation = mix(0.0, 1.0, distance);
		
		// Apply twisting and rotation to the angle to create a swirling effect
		float twist = sin(angle * 12.0 + rotation * 10.0) * 0.5;
		
		// Add randomness to the swirls
		float swirlRandomness = random(distance);
		float twistRandomness = random(distance * 0.5);
		
		// Apply randomness to the twisting effect
		twist += swirlRandomness * twistRandomness * 0.25;
		
		// Calculate the fade value based on the distance from the center
		float fade = smoothstep(0.4, 0.5, distance);
		
		// Add randomness to the color
		float colorRandomness = random(distance * 5.5);
		float colorVariation = mix(-0.2, 0.2, colorRandomness);
		
		// Set the base color with blue and apply color variation
		vec4 baseColor = vec4(1.0, 1.0, 1.0, 1.0);
		vec4 color = baseColor + vec4(colorVariation);
		
		// Calculate the transparency based on line length and distance from center
		float lineLength = mix(0.1, 0.5, random(distance));
		float transparency = clamp(distance - twist + fade * 0.5, 0.0, 1.0);
		
		// Smoothly fade out the transparency towards the center
		float fadeOut = smoothstep(0.1, 0.55, distance);
		transparency *= fadeOut;
		
		// Apply transparency to the lines based on line length
		if (twist > lineLength) {
			transparency = 0.0;
		}
		
		// Set the final color with transparency
		color.a = transparency;
		
		// Check the boolean uniform and apply rainbow colors if true
		if (useRainbowColors) {
			// Calculate the hue based on the angle
			float hue = (angle + time * 10.0) / (2.0 * 3.14159);
			hue = fract(hue); // Keep the hue within [0, 1]
			
			// Convert the hue to RGB using the HSL to RGB conversion formula
			vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
			
			// Assign the rainbow color based on the hue
			color.rgb = rgb;
		}
		
		gl_FragColor = color;
    }
	`,w=new THREE.ShaderMaterial({uniforms:{time:{value:0},useRainbowColors:{value:e===0}},vertexShader:E,fragmentShader:f,transparent:!0}),v=new THREE.Mesh(d,w);i.add(v);const b=new THREE.MeshPhongMaterial({color:16777215}),T=new THREE.Mesh(p,b);i.add(T),T.rotation.x=-Math.PI/2,i.scale.set(1.5,1.5,1.5);let y;if(t===1){const g=k(s.simple,54);y=new THREE.Vector3(g.x,g.y,g.z)}else{const g=k(s.simple,s.length);y=new THREE.Vector3(g.x,g.y,g.z)}i.position.copy(y);const M=y.clone().normalize(),x=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),M);i.name=`ring-${e}`,i.userData={number:e,points:s},i.quaternion.copy(x);const S=Math.random()*(Math.PI*2);return i.rotation.z=S,i}function k(s,e){const i=new THREE.Vector3(s.x,s.y,s.z).clone().normalize().clone().multiplyScalar(e);return{x:i.x,y:i.y,z:i.z}}function P(s,e){const t=[];return s.points.forEach((i,n)=>{const a=B(i,n,e);t.push(a)}),t}class F{constructor(){this.camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e3)}getCamera(){return this.camera}}const z=[{level:1,name:"Earth",description:"Earth - the planet we live on.",backgroundLight:"0xafddf0",backgroundDark:"0x070712",tracks:[{name:"Pyramid Sightseeing",level:1,points:[{simple:{x:-3.1230314016496,y:47.44618806033391,z:15.455158642129286},length:59},{simple:{x:-4.28198062595915,y:32.536771144808,z:37.718820458736445},length:52},{simple:{x:10.76656078378565,y:12.929996445849614,z:47.07408899748679},length:54},{simple:{x:18.96403020171025,y:-6.811431034632012,z:45.75931453277371},length:57},{simple:{x:16.217259524120465,y:-29.211181565560032,z:37.187470168554256},length:53},{simple:{x:.9671581565807124,y:-42.678287168170435,z:26.02872203540411},length:59},{simple:{x:-23.908787142704625,y:-31.116914804176147,z:30.975652146820295},length:52},{simple:{x:-29.551025997812246,y:-39.90245181504456,z:5.870813457825555},length:59},{simple:{x:-46.42763052654823,y:.6561845496155503,z:-20.24187340488808},length:55}],achievements:{name:"Pyramid Sightseeing",levels:{platinum:35,gold:40,silver:45,bronze:50}}},{name:"Canal crusing",level:2,points:[{simple:{x:10.727072335090206,y:47.41103892847462,z:11.698241272209518},length:56.71421745944286},{simple:{x:18.33324404927461,y:46.50401172917501,z:-1.009010620971729},length:54.96745356042868},{simple:{x:15.17317663467264,y:37.290779788169324,z:-29.647768467409445},length:54.7591466716123},{simple:{x:9.323099163925004,y:19.865405544284158,z:-44.919439152303845},length:52.44303580101542},{simple:{x:-3.069483927435459,y:5.525199639972724,z:-49.587271953478904},length:56.38755307348459},{simple:{x:-18.186341760770954,y:-5.520590393340896,z:-46.234314819123654},length:53.08461916817752},{simple:{x:-10.133980305392738,y:-27.263477710192987,z:-40.66097785231733},length:56.015719586335294}],achievements:{name:"Canal crusing",levels:{platinum:20,gold:30,silver:40,bronze:45}}},{name:"Earth 3",level:3,points:[{simple:{x:-6.030321936987191,y:53.11037808908864,z:7.676129009490675},length:53},{simple:{x:52.32451569816361,y:12.050199943395599,z:-5.739140900589465},length:59},{simple:{x:20.448563321324958,y:36.03240482148047,z:-34.63411700729087},length:55},{simple:{x:-48.21608053394141,y:22.914837830399378,z:8.131407329052816},length:57}],achievements:{name:"Earth 3",levels:{platinum:20,gold:30,silver:40,bronze:45}}}]},{level:2,name:"Mars",description:"Mars - the red planet.",backgroundLight:"0x1a0706",backgroundDark:"0x7d0200",tracks:[{name:"The footsteps of Curiosity",level:1,points:[{simple:{x:-47.308150378809636,y:-17.896779278977757,z:18.91148326217397},length:53},{simple:{x:-53.50706262638577,y:6.869548069904277,z:2.4090575774161858},length:56},{simple:{x:19.786975158249124,y:23.26795323470244,z:-44.53176356663333},length:58},{simple:{x:-4.085838588182595,y:29.989403506299066,z:44.720706617490904},length:59}],achievements:{name:"The footsteps of Curiosity",levels:{platinum:20,gold:30,silver:40,bronze:45}}}]},{level:3,name:"Test",description:"Test-planet! For all the weird testing <3",backgroundLight:"0x3cfa02",backgroundDark:"0xe502fa",tracks:[{name:"Test",level:1,points:[{simple:{x:-47.308150378809636,y:-17.896779278977757,z:18.91148326217397},length:53},{simple:{x:-53.50706262638577,y:6.869548069904277,z:2.4090575774161858},length:56},{simple:{x:19.786975158249124,y:23.26795323470244,z:-44.53176356663333},length:58},{simple:{x:-4.085838588182595,y:29.989403506299066,z:44.720706617490904},length:59}],achievements:{name:"Test",levels:{platinum:20,gold:30,silver:40,bronze:45}}}]}];class R{static currentState;static previousState;static difficulty;static difficulties;static planet;static planets;static track;static planetTrack;static currentAchievementTracking;static currentRing;static nextRing;static raceStartTime;static raceTrackTime;static ringTime;static sinceLastRing;static mode;constructor(){if(R.instance)return R.instance;this.planets=z,this.currentState="menu",this.previousState="menu",this.ringTime={},this.planetTrack=this.planets[0].tracks[0],this.currentAchievementTracking=this.planetTrack.achievements,this.raceTrackTime=0,this.sinceLastRing=0,this.difficulty=1,this.difficulties=[{level:1,name:"Beginner",description:"Beginner flying - only left/right. No up/down, and the rings turn to you."},{level:2,name:"Intermediate",description:"Intermediate flying - both left/right and up/down."},{level:3,name:"Expert",description:"Expert flying - both left/right and up/down, and the rings are static."}],this.gameModes=[{name:"Keyboard",level:"key"},{name:"Mouse",level:"mouse"},{name:"Phone",level:"orientation"}],this.mode="key",this.planet=1,this.countdown={value:2},R.instance=this}setCurrentRing(e){this.currentRing=e}getCurrentRing(){return this.currentRing}getControls(){return this.gameModes.find(e=>e.level===this.mode).name}setCurrentPlanetTrack(e){this.planetTrack=this.planets[this.planet-1].tracks[e-1]}setNextControl(){let e=!1;this.gameModes.forEach((i,n)=>{console.log(i.level,this.mode),i.level===this.mode&&!e&&(n===this.gameModes.length-1?this.mode=this.gameModes[0].level:this.mode=this.gameModes[n+1].level,e=!0)});const t=document.getElementById("controls");t.innerHTML=this.getControls()}resetGameStates(){this.device==="mobile"&&(document.getElementById("gui").style.display="none"),this.sinceLastRing=0,this.ringTime={},this.raceTrackTime=0,this.track.forEach((e,t)=>{t===0&&e.name.includes("ring")&&e.userData.number===0&&(this.setCurrentRing(e),this.nextRing=this.track[this.currentRing.userData.number+1]),t===0?e.children[0].material.uniforms.useRainbowColors.value=!0:e.children[0].material.uniforms.useRainbowColors.value=!1})}setMode(e){this.mode=e,console.log("updated mode with ",e)}checkCurrentRing(e,t){this.currentRing.position.distanceTo(e)<1.1&&(t.fireSparks(e),this.currentRing.userData.number===this.track.length-1?(this.ringTime[this.currentRing.userData.number+1]=Date.now()-this.raceStartTime,window.dispatchEvent(new Event("gameCompleted")),this.setGameState("scoreboard"),this.setGameCompletionData()):(this.nextRing=this.track[this.currentRing.userData.number+1],this.currentRing.children[0].material.uniforms.useRainbowColors.value=!1,this.setCurrentRing(this.nextRing),this.currentRing.children[0].material.uniforms.useRainbowColors.value=!0,this.ringTime[this.currentRing.userData.number]=Date.now()-this.raceStartTime,this.sinceLastRing=this.ringTime[this.currentRing.userData.number]))}setGameState(e){this.currentState=e}setDifficulty(e){this.difficulty=e,console.log("updated with",e),window.dispatchEvent(new Event("difficultyChanged"))}setPlanet(e){this.planet=e,window.dispatchEvent(new Event("planetChanged")),this.setTrack(1)}setTrack(e){this.planetTrack=this.planets[this.planet-1].tracks[e-1],window.dispatchEvent(new Event("trackChanged")),this.currentAchievementTracking=this.planetTrack.achievements,console.log(this.currentAchievementTracking,"currentAchievementTracking")}resetGui(){document.getElementById("height").value=0,document.getElementById("gui").style.display="none"}setGameCompletionData(){document.getElementById("ringCounter").innerText=this.track.length+"/"+this.track.length;let e=this.getMedal(this.raceTrackTime,this.currentAchievementTracking);console.log(e,"medal"),this.setMedalType(e),document.getElementById("gui").style.display="none",console.log(this.currentAchievementTracking,"completed planet!"),this.hideExitButton(),document.getElementById("allRingTimes").innerText="",document.getElementById("scoredata").innerText="";const t=document.createElement("div");t.id="scoredataHeader";const i=document.createElement("div");t.innerHTML=`
		<h2>Congratulations!</h2>
		<p>You completed the ${this.currentAchievementTracking.name} track on ${this.difficulties[this.difficulty-1].name}!</p>
		<div class="score">Track completed in <span class="highlight mainScore">${this.raceTrackTime}</span> seconds.</div>
		<div class="score">This earned you a <span class="highlight text ${e}">${e}</span> medal.</div>
		`,Object.keys(this.ringTime).forEach((n,a)=>{i.innerHTML+=`
			<div class="ring">Ring ${a+1} after <span class="highlight">${(this.ringTime[a+1]/1e3).toFixed(2)}</span> seconds.</div>
			`}),document.getElementById("scoredata").append(t),document.getElementById("allRingTimes").append(i),gsap.set(document.getElementById("scoreboard"),{zIndex:3,display:"flex"}),gsap.to(document.getElementById("scoreboard"),{opacity:1,duration:.5})}getMedal(e,t){console.log(t,"achievements");let i="bronze";return e<=t.levels.platinum?i="platinum":e<=t.levels.gold?i="gold":e<=t.levels.silver&&(i="silver"),i}resetRacetime(){document.getElementById("racetime").innerText="",this.raceTrackTime=0}resetRingCounter(){document.getElementById("ringCounter").innerText=""}hideScoreboard(){gsap.to(document.getElementById("scoreboard"),{opacity:0,duration:.5,onComplete:()=>{gsap.set(document.getElementById("scoreboard"),{zIndex:-1,display:"none"})}}),this.resetGameStates()}positionMenuAndScene(e){e?(this.device==="mobile"&&(document.getElementById("gui").style.display="none"),gsap.to(document.getElementById("menu"),{opacity:1,duration:.5,pointerEvents:"all"})):gsap.to(document.getElementById("menu"),{opacity:0,duration:.5,pointerEvents:"none"})}revealExitButton(){gsap.set(document.getElementById("exit-button"),{zIndex:10,display:"block"}),gsap.to(document.getElementById("exit-button"),{opacity:1,duration:.5})}hideExitButton(){gsap.to(document.getElementById("exit-button"),{opacity:0,duration:.5,onComplete:()=>{gsap.set(document.getElementById("exit-button"),{zIndex:-1,display:"none"})}})}setMedalType(e){document.getElementById("medal").classList.remove("bronze","silver","gold","platinum"),document.getElementById("medal").classList.add(e),document.getElementById("medal-quality").innerText=e.toUpperCase(),document.getElementById("medal-shade").innerText=e.toUpperCase()}beginCountdown(){this.setGameState("countdown"),gsap.to(document.getElementById("countdown"),{opacity:1,duration:.2}),gsap.to(this.countdown,{value:0,ease:"none",duration:this.countdown.value,onUpdate:()=>{this.countdown.value>=.1?document.getElementById("countdown").innerHTML=Math.ceil(this.countdown.value):document.getElementById("countdown").innerHTML="GO!"},onComplete:()=>{this.setGameState("playing"),(this.device==="mobile"||this.mode==="orientation")&&(document.getElementById("gui").style.display="flex"),this.revealExitButton(),this.raceStartTime=Date.now(),this.sinceLastRing=0,this.countdown.value=2,gsap.to(document.getElementById("countdown"),{opacity:0,duration:1})}})}}class V{static movingForward;static movingBackward;static movingLeft;static movingRight;static movingUp;static movingDown;static dragonPosition;static dragonDirection;static speed;static initSpeed;static altitude;static dragon;static objectUp;static counter;static tiltFactor;static altitudeChange;static gameState;static camera;static dragon;static cameraInitialPosition;static boost;static gyroscopeAllowed;static mousePosition;static orientation;static dragonInitialDirection;static dragonInitialPosition;static dragonInitialQuaternion;static dragonInitialRotation;static initialAltitude;static tiltAcceleration;static tiltDeacceleration;static worldRadius;static dragonManager;constructor(e,t,i,n){if(this.gameState=new R,document.addEventListener("keydown",this.onKeyDown,!1),document.addEventListener("keyup",this.onKeyUp,!1),document.addEventListener("mousemove",this.onMouseMove,!1),document.getElementById("height").addEventListener("input",()=>{document.getElementById("height").value>.006?(this.movingUp=!1,this.movingDown=!0):document.getElementById("height").value<-.006?(this.movingDown=!1,this.movingUp=!0):(this.movingDown=!1,this.movingUp=!1)}),window.addEventListener("deviceorientation",this.onOrientation,!1),window.addEventListener("dragonLoaded",()=>{this.dragon=i.getDragon(),this.dragonInitialPosition=new THREE.Vector3(0,this.initialAltitude+2,0),this.dragonIniitalQuaternion=this.dragon.quaternion.clone(),this.dragonInitialRotation=this.dragon.rotation.clone(),this.cameraInitialPosition=this.camera.position.clone(),this.dragon.position.copy(this.dragonPosition),this.setMenuPlacement()}),"Gyroscope"in window){const a=new Gyroscope({frequency:60});a.addEventListener("reading",this.onGyroscrope,!1),a.start(),this.gyroscopeAllowed=!0}else this.gyroscopeAllowed=!1,console.log("no gyroscipe");screen.orientation.addEventListener("change",a=>{const o=a.target.type,r=a.target.angle;console.log(`ScreenOrientation change: ${o}, ${r} degrees.`)}),console.log(screen.orientation,"device orientation"),this.dragonInitialDirection=new THREE.Vector3(0,0,1),this.dragonDirection=new THREE.Vector3(0,0,1),this.dragonPosition=new THREE.Vector3(0,e+4,0),this.altitude=e+4,this.objectUp=new THREE.Vector3(0,1,0),this.counter=0,this.speed=.1,this.initSpeed=.1,this.boost=!1,this.tiltFactor=0,this.movingForward=!1,this.movingBackward=!1,this.movingLeft=!1,this.movingRight=!1,this.movingUp=!1,this.movingDown=!1,this.altitudeChange=0,this.camera=t,this.dragon=i.getDragon(),this.dragonManager=i,this.initialAltitude=this.altitude,this.tiltAcceleration=.3,this.tiltDeacceleration=this.tiltAcceleration*2,this.worldRadius=n,this.mousePosition={x:0,y:0},this.orientation={alpha:0,beta:0,gamma:0},this.currentRotationSpeed=0,this.targetRotationSpeed=0,this.rotationAcceleration=4,this.rotationDamping=5}destructor(){document.removeEventListener("keydown",this.onKeyDown,!1),document.removeEventListener("keyup",this.onKeyUp,!1),document.removeEventListener("mousemove",this.onMouseMove,!1),window.removeEventListener("deviceorientation",this.onOrientation,!1),screen.orientation.removeEventListener("change",this.setOrientationBounds,!1)}setOrientationBounds(e){console.log(e,"Lol?")}createStartFlightAnimation(e,t){new THREE.Vector3().addVectors(e,t).divideScalar(3);const n=new THREE.Vector3(0,0,-this.worldRadius*5);return new THREE.QuadraticBezierCurve3(e.clone(),n.clone(),t.clone())}updateSkyColor(e,t,i,n){const a=new THREE.Vector3(-120,0,-120).normalize(),o=new THREE.Vector3(120,0,120).normalize(),r=e.clone().normalize(),d=r.dot(a),h=r.dot(o),l=Math.max(0,d),m=Math.max(0,h),u=new THREE.Color(parseInt(n.backgroundDark)),p=new THREE.Color(parseInt(n.backgroundLight)),E=l-m,f=u.clone().lerp(p,(E+1)/2);t.setClearColor(f);const w=.03,b=w-(w-1e-5)*(l+m)/2;this.gameState.currentState==="playing"?(i.color.copy(f),i.density=b):this.gameState.currentState==="countdown"?(i.density=THREE.MathUtils.lerp(i.density,b,.05),i.color.lerp(f,.05)):i.density=THREE.MathUtils.lerp(i.density,1e-4,.05)}setFlightPlacement(){const e=this.calculateCameraPositionBehindDragon(),t=this.createStartFlightAnimation(this.camera.position,e);this.gameState.setGameState("transition"),this.gameState.positionMenuAndScene(!1),console.log("setting flight placement");const i=2.5,n={t:0};gsap.to(n,{t:1,duration:i,ease:"power1.inOut",onComplete:()=>{n.t=0,this.gameState.beginCountdown()},onUpdate:()=>{const a=t.getPointAt(n.t);this.camera.position.copy(a),this.camera.lookAt(this.dragon.position)}})}resetDragonState(){this.dragon.position.copy(new THREE.Vector3(0,this.initialAltitude,0)),this.dragon.quaternion.copy(this.dragonIniitalQuaternion),this.dragon.rotation.copy(this.dragonInitialRotation),this.dragon.up.set(0,1,0),this.dragon.up.copy(new THREE.Vector3(0,1,0)),this.dragonDirection=new THREE.Vector3(0,0,1),this.dragonPosition=new THREE.Vector3(0,this.initialAltitude,0)}setMenuPlacement(e){e===!0?gsap.to(document.getElementById("blackscreen"),{opacity:1,duration:.5,onComplete:()=>{this.resetCameraAndDragon(),this.gameState.positionMenuAndScene(!0),this.gameState.setGameState("menu"),this.gameState.resetRacetime(),this.gameState.resetRingCounter(),gsap.to(document.getElementById("blackscreen"),{opacity:0,duration:.5,delay:.2})}}):(this.resetCameraAndDragon(),this.gameState.positionMenuAndScene(!0),this.gameState.setGameState("menu"),this.gameState.resetRacetime(),this.gameState.resetRingCounter())}setArrowPosition(e,t){if(e!==void 0&&(this.gameState.currentState!=="playing"&&this.gameState.currentState!=="countdown"&&e.visible===!0?e.visible=!1:(this.gameState.currentState==="playing"||this.gameState.currentState==="countdown")&&e.visible===!1&&(e.visible=!0),this.gameState.currentState==="countdown"||this.gameState.currentState==="playing")){const n=this.camera.getWorldDirection(new THREE.Vector3).clone().multiplyScalar(-.5),o=this.dragon.position.clone().add(n).clone().normalize().multiplyScalar(this.altitude-.7);e.position.copy(o),e.lookAt(t.position),e.rotateX(Math.PI/2)}}resetCameraAndDragon(){console.log("resetting camera and dragon"),this.camera.position.set(0,-this.worldRadius-100,-.001),this.objectUp=new THREE.Vector3(0,1,0),this.camera.up.copy(this.objectUp),this.altitude=this.initialAltitude,this.camera.lookAt(0,0,0),this.resetDragonState()}calculateCameraPositionBehindDragon(){const t=this.dragonDirection.clone().negate().clone().multiplyScalar(2);return this.dragon.position.clone().add(t).clone().normalize().multiplyScalar(this.altitude+1)}updateRotation(e){return this.currentRotationSpeed+=(this.targetRotationSpeed-this.currentRotationSpeed)*e*this.rotationAcceleration,this.targetRotationSpeed===0&&(this.currentRotationSpeed*=Math.exp(-this.rotationDamping*e)),this.currentRotationSpeed*Math.PI*e}changeDirection(e){if(this.gameState.currentState!=="playing")return;let t=0;if(this.gameState.mode==="key")this.movingLeft&&(t+=1),this.movingRight&&(t-=1);else if(this.gameState.mode==="mouse")t=this.mousePosition.x;else if(this.gameState.mode==="orientation"){let a=0;(this.orientation.beta<-5||this.orientation.beta>5)&&(this.orientation.gamma<0?a=this.orientation.beta:a=this.orientation.beta<0?-180+this.orientation.beta*-1:180-this.orientation.beta),t=THREE.MathUtils.clamp(a*-.02,-1,1)}this.currentRotationSpeed===void 0&&(this.currentRotationSpeed=0),this.targetRotationSpeed===void 0&&(this.targetRotationSpeed=0),this.targetRotationSpeed=t;const i=5;this.currentRotationSpeed+=(this.targetRotationSpeed-this.currentRotationSpeed)*e*i,this.currentRotationSpeed*=Math.exp(-3*e);const n=this.currentRotationSpeed*Math.PI*e;if(n!==0){const a=new THREE.Quaternion().setFromAxisAngle(this.objectUp,n);this.dragonDirection.applyQuaternion(a),this.objectUp.applyQuaternion(a)}this.movingDown&&(this.altitude>this.worldRadius+1&&this.altitudeChange>-.045&&(this.gameState.mode==="key"?this.altitudeChange-=this.tiltAcceleration*e:this.gameState.mode==="mouse"?this.altitudeChange+=this.tiltAcceleration*e*this.mousePosition.y:this.gameState.mode==="orientation"&&(this.altitudeChange-=this.tiltAcceleration*e)),this.altitude<=this.worldRadius+1&&this.altitudeChange<0&&(this.altitudeChange+=this.tiltDeacceleration*e)),this.movingUp&&(this.altitude<this.worldRadius+10&&this.altitudeChange<.045&&(this.gameState.mode==="key"?this.altitudeChange+=this.tiltAcceleration*e:this.gameState.mode==="mouse"?this.altitudeChange+=this.tiltAcceleration*e*this.mousePosition.y:this.gameState.mode==="orientation"&&(this.altitudeChange+=this.tiltAcceleration*e)),this.altitude>=this.worldRadius+10&&this.altitudeChange>0&&(this.altitudeChange-=this.tiltDeacceleration*e)),!this.movingDown&&!this.movingUp&&(this.altitudeChange>.005?this.altitudeChange-=this.tiltAcceleration*e:this.altitudeChange<-.005&&(this.altitudeChange+=this.tiltAcceleration*e),Math.abs(this.altitudeChange)<.005&&(this.altitudeChange=0)),this.altitude+=this.altitudeChange}update(e){if(this.dragon===void 0||this.gameState.currentState==="menu"||this.gameState.currentState==="transition"||this.gameState.currentState==="countdown"||this.gameState.currentState==="scoreboard")return;this.dragonDirection.normalize();const t=this.dragonDirection.clone().multiplyScalar(this.speed),i=this.dragonPosition.clone().add(t);i.normalize().multiplyScalar(this.altitude);const n=i.clone().sub(new THREE.Vector3(0,0,0)).normalize();this.objectUp=n;const a=i.clone().sub(this.dragonPosition).normalize();this.dragonPosition=i,this.dragon.position.copy(i),this.dragon.up.copy(n),this.dragon.lookAt(i.clone().add(a)),this.dragonDirection.copy(a);const o=this.calculateCameraPositionBehindDragon();this.camera.position.copy(o),this.camera.up.copy(n),this.camera.lookAt(this.dragonPosition)}tiltDragon(e){this.gameState.currentState==="playing"&&((this.movingLeft||this.movingRight||this.tiltFactor!==0)&&(this.dragon.rotation.z+=this.tiltFactor,this.movingLeft&&this.tiltFactor>-1&&(this.tiltFactor>0?this.tiltFactor-=5*e:this.tiltFactor-=2*e),this.movingRight&&this.tiltFactor<1&&(this.tiltFactor<0?this.tiltFactor+=5*e:this.tiltFactor+=2*e)),!this.movingRight&&!this.movingLeft&&(this.tiltFactor>0?this.tiltFactor-=3*e:this.tiltFactor<0&&(this.tiltFactor+=3*e),Math.abs(this.tiltFactor)<.02&&(this.tiltFactor=0)))}fireBoost(){this.boost!==!0&&(this.boost=!0,this.dragonManager.dragonSoarStart(.2),this.dragonManager.dragonFlyFadeOut(),gsap.to(this,{speed:.7,duration:1.5,ease:"power1.in",onComplete:()=>{gsap.to(this,{speed:this.initSpeed,duration:.7,delay:1,ease:"power1.out",onComplete:()=>{this.boost=!1,this.dragonManager.dragonFlyStart(),this.dragonManager.dragonFlyFadeIn(),this.dragonManager.dragonSoarStop()}})}}))}onKeyDown=e=>{switch(e.keyCode){case 27:this.gameState.currentState==="playing"&&(this.setMenuPlacement(!0),this.gameState.hideExitButton(),this.gameState.resetGui()),this.gameState.currentState==="scoreboard"&&(this.gameState.hideScoreboard(),this.setMenuPlacement(!1),this.gameState.resetGui());break;case 38:case 87:this.movingUp=!0;break;case 37:case 65:this.movingLeft=!0;break;case 40:case 83:this.movingDown=!0;break;case 39:case 68:this.movingRight=!0;break;case 32:this.fireBoost();break}};onKeyUp=e=>{switch(e.keyCode){case 38:case 87:this.movingUp=!1;break;case 37:case 65:this.movingLeft=!1;break;case 40:case 83:this.movingDown=!1;break;case 39:case 68:this.movingRight=!1;break}};onGyroscrope=e=>{console.log(e)};onOrientation=e=>{if(this.gameState.currentState==="playing"&&this.gameState.mode==="orientation"){let t=e.beta;t<0&&(t+=360);const i=20;this.orientation=e,t>i&&t<180?(this.movingLeft=!1,this.movingRight=!0):t>180&&t<360-i?(this.movingRight=!1,this.movingLeft=!0):(this.movingRight=!1,this.movingLeft=!1),console.log(this.orientation.gamma)}};onMouseMove=e=>{this.gameState.currentState==="playing"&&this.gameState.mode==="mouse"&&(this.mousePosition.x=e.clientX/window.innerWidth*2-1,this.mousePosition.y=-(e.clientY/window.innerHeight)*2+1,console.log(this.mousePosition),this.mousePosition.x>.1?(this.movingLeft=!1,this.movingRight=!0):this.mousePosition.x<-.1?(this.movingRight=!1,this.movingLeft=!0):this.mousePosition.x<.05&&this.mousePosition.x>-.05&&(this.movingRight=!1,this.movingLeft=!1),this.mousePosition.y>.1?(this.movingDown=!1,this.movingUp=!0):this.mousePosition.y<-.1?(this.movingUp=!1,this.movingDown=!0):this.mousePosition.y<.05&&this.mousePosition.y>-.05&&(this.movingUp=!1,this.movingDown=!1))}}class G{static dragon;static animations;static mixer;static flying;static soar;static currentFlying;static currentSoar;constructor(e,t,i){new THREE.GLTFLoader().load("./assets/dragon6.glb",a=>{this.dragon=a.scene,this.dragon.name="dragon",this.dragon.scale.set(.1,.1,.1),this.dragon.traverse(function(r){r.isMesh&&(r.castShadow=!0)}),t.add(this.dragon),i.push(this.dragon),this.mixer=new THREE.AnimationMixer(this.dragon),this.animations=a.animations,this.flying=THREE.AnimationClip.findByName(a.animations,"Flying"),this.soar=THREE.AnimationClip.findByName(a.animations,"Soar"),this.flying&&(this.currentFlying=this.mixer.clipAction(this.flying),this.currentFlying.play(),this.currentSoar=this.mixer.clipAction(this.soar));const o=r=>{this.mixer.update(r)};e.push(o),window.dispatchEvent(new Event("dragonLoaded"))},void 0,a=>{console.error("Error loading GLB file:",a)})}getDragon(){return this.dragon}dragonSoarStart(e){e&&this.currentSoar.setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(e),this.currentSoar=this.mixer.clipAction(this.soar),this.currentSoar.play()}dragonSoarStop(){this.currentSoar.stop()}dragonSoarFadeOut(){this.currentSoar.setEffectiveTimeScale(1).setEffectiveWeight(1).fadeOut(.2)}dragonSoarFadeIn(){this.currentSoar.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(.2)}dragonFlyStart(){this.currentFlying=this.mixer.clipAction(this.flying),this.currentFlying.play()}dragonFlyStop(){this.currentFlying.stop()}dragonFlyFadeOut(){this.currentFlying.setEffectiveTimeScale(1).setEffectiveWeight(1).fadeOut(.2)}dragonFlyFadeIn(){this.currentFlying.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(.2)}}class U{static gameState;static ring;constructor(){this.gameState=new R}destructor(){}constructTrack(e,t,i,n){const a=this.buildRandomTrack(e,t),o={name:n,points:a,achievements:this.calculateTimeForRoute(a,i,n)};return console.log(o),o}calculateTimeForRoute(e,t,i){let n=0;e.forEach((o,r)=>{if(r===0)n+=t.distanceTo(new THREE.Vector3(o.x,o.y,o.z));else{const d=new THREE.Vector3(e[r-1].x,e[r-1].y,e[r-1].z);n+=d.distanceTo(new THREE.Vector3(o.x,o.y,o.z))}});const a={name:i,levels:{platinum:20,gold:30,silver:40,bronze:45}};return console.log(a),a}buildRandomTrack(e,t){const i=t,n=[];for(let a=0;a<e;a++){const o=this.generateRandomPoint(i+2,i+Math.random()*7+2),r={simple:o.simple,complex:o.complex};n.push(r)}return n}generateRandomPoint(e,t){const i=Math.random(),n=Math.random(),a=2*Math.PI*i,o=Math.acos(2*n-1),r={},d=e*Math.sin(o)*Math.cos(a),h=e*Math.sin(o)*Math.sin(a),l=e*Math.cos(o),m=t*Math.sin(o)*Math.cos(a),u=t*Math.sin(o)*Math.sin(a),p=t*Math.cos(o);return r.simple=new THREE.Vector3(d,h,l),r.complex=new THREE.Vector3(m,u,p),r}generatePointFromCoordinate(e,t,i){const n=e.clone().normalize(),a=n.clone().multiplyScalar(t),o=n.clone().multiplyScalar(i);return{simple:a,complex:o}}getRing(){return this.ring}}class O{constructor(e,t,i,n){this.scene=e,this.camera=t,this.renderer=i,this.raycaster=new THREE.Raycaster,this.mouse=new THREE.Vector2,this.edit=n,this.mouseDownPosition=new THREE.Vector2,this.mouseMoved=!1,this.edit&&(window.addEventListener("mousedown",a=>this.onMouseDown(a)),window.addEventListener("mouseup",a=>this.onMouseUp(a)),window.addEventListener("mousemove",()=>this.onMouseMove()))}onMouseDown(e){this.edit&&e.button===0&&(this.mouseDownPosition.set(e.clientX,e.clientY),this.mouseMoved=!1)}onMouseMove(){this.mouseMoved=!0}onMouseUp(e){this.edit&&e.button===0&&!this.mouseMoved&&this.shootRay(e)}shootRay(e){console.log("BOOM RAY!"),this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.scene.children);if(t.length>0){const i=t[0].object;if(console.log(`Intersected object: ${i.name}`),i){const n=t[0].point,a=t[0].face.normal;console.log(`{"simple": { "x":${n.x}, "y":${n.y}, "z":${n.z}}, "length":${Math.random()*8+52}}`);const o=a.clone().normalize(),r=2,d=.5,h=.3,l=new THREE.ArrowHelper(o,n,r,16711680,d,h);this.scene.add(l)}}}}class q{constructor(e,t){this.scene=e,this.renderer=t,this.particles=[];const i=new THREE.SphereGeometry(.03,8,8),n=new THREE.MeshBasicMaterial({transparent:!0});for(let a=0;a<200;a++){const o=new THREE.Mesh(i,n.clone());o.name=`particle-${a}`,o.material.color=new THREE.Color(Math.random(),Math.random(),Math.random()),o.material.opacity=0,o.userData.velocity=new THREE.Vector3,o.userData.speed=0,this.scene.add(o),this.particles.push(o)}}fireSparks(e){this.particles.forEach(t=>{const i=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),n=Math.random()*2,a=new THREE.Vector3().copy(e).addScaledVector(i,n);t.position.copy(a);const o=.02+Math.random()*.05;t.userData.velocity.copy(i).multiplyScalar(o),t.material.opacity=1,t.visible=!0})}}class N{static FPS;static prevTick;static camera;static scene;static renderer;static threeObjects;static cannonObjects;static world;static worldRadius;static solver;static fixedTimeStep;static maxSubSteps;static stats;static previousTime;static updateFunctions;static movement;static dragon;static primaryPlanet;static planets;static blurPlane;static gameState;static racing;static editMode;static arrowPointer;static sunViewVector;static mooonViewVector;static fog;static rayTracer;static sparks;constructor(){if(this.editMode=!1,this.FPS=60,this.prevTick=0,this.fog=new THREE.FogExp2(new THREE.Color(11525616),0),this.scene=new THREE.Scene,this.scene.fog=this.fog,this.updateFunctions=[],this.worldRadius=50,this.threeObjects=[],this.cannonObjects=[],this.previousTime=Date.now(),this.sunViewVector=new THREE.Vector3(0,0,0),this.moonViewVector=new THREE.Vector3(0,0,0),this.gameState=new R,this.camera=new F,this.racing=new U(this.worldRadius),this.dragon=new G(this.updateFunctions,this.scene,this.threeObjects),this.movement=new V(this.worldRadius,this.camera.getCamera(),this.dragon,this.worldRadius),this.sparks=new q(this.scene,this.renderer),this.planets=[],this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0),this.renderer.shadowMap.enabled=!0,this.rayTracer=new O(this.scene,this.camera.getCamera(),this.renderer,this.editMode),this.editMode===!0){document.getElementById("menu").style.display="none",new THREE.OrbitControls(this.camera.getCamera(),this.renderer.domElement).update();const t=document.createElement("select");t.id="planetSelector",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.zIndex="100",t.addEventListener("change",i=>{this.setPrimaryPlanet(Number(i.target.value))}),document.body.appendChild(t),this.gameState.planets.forEach(i=>{const n=document.createElement("option");n.value=i.level,n.text=i.name,t.appendChild(n)})}document.getElementById("engine").appendChild(this.renderer.domElement),this.createUniverse(),this.start(),this.arrowPointer=this.constructHelperArrow(),window.addEventListener("gameCompleted",()=>{this.movement.resetCameraAndDragon()}),window.addEventListener("trackChanged",()=>{this.updateRings()}),window.addEventListener("difficultyChanged",()=>{this.updateRings()}),window.addEventListener("planetChanged",()=>{this.setPrimaryPlanet(this.gameState.planet),document.getElementById("trackSelector"),trackSelector.setAttribute("items",JSON.stringify(this.gameState.planets[this.gameState.planet-1].tracks))})}updateRings(){const e=this.planets[this.gameState.planet-1];for(let n=e.children.length-1;n>=0;n--){const a=e.children[n];a.name.includes("ring")&&a.parent.remove(a)}P(this.gameState.planetTrack,this.gameState.difficulty).forEach(n=>{this.planets[this.gameState.planet-1].add(n)}),this.gameState.track=this.primaryPlanet.children.filter(n=>n.name.includes("ring")),this.gameState.currentAchivementTracking=this.primaryPlanet.userData.achievements;const i=this.primaryPlanet.children.find(n=>n.name.includes("ring")&&n.userData.number===0);this.gameState.setCurrentRing(i)}createUniverse(){this.gameState.planets.forEach((t,i)=>{let n;i===0?n=H(this.worldRadius,t.level,t.name,t.tracks,this.scene,this.camera.getCamera().position,this.prevTick):i===1?n=L(t.level,t.name,t.tracks,this.prevTick):n=D(this.worldRadius,t.level,t.name,t.tracks),n.visible=!1,this.planets.push(n),this.addWorldObject(n)}),P(this.gameState.planetTrack,this.gameState.difficulty).forEach(t=>{this.planets[0].add(t)}),this.setPrimaryPlanet(1)}constructHelperArrow(){const e=new THREE.BoxGeometry(1,2,.5),t=new THREE.MeshPhongMaterial({color:65280}),i=new THREE.Mesh(e,t);i.position.set(this.camera.getCamera().position.x,this.camera.getCamera().position.y,this.camera.getCamera().position.z);const n=new THREE.CylinderGeometry(1,1,.5,3,1);n.translate(0,0,1),n.rotateX(-Math.PI/2);const a=new THREE.Mesh(n,t);return i.add(a),i.rotateY(-Math.PI),this.scene.add(i),i.scale.set(.1,.1,.1),i}addWorldObject(e){this.scene.add(e),this.threeObjects.push(e)}findWorldObject(e){return this.threeObjects.find(t=>t.userData.id===e)||null}rotatePlanetToInitialPosition(){gsap.to(this.primaryPlanet.rotation,{y:0,x:0,z:0,duration:1})}setDifficulty(e){this.gameState.setDifficulty(e)}setPrimaryPlanet(e){e!==1?this.scene.children.forEach(t=>{t.name==="sun-glow"&&(t.visible=!1)}):this.scene.children.forEach(t=>{t.name==="sun-glow"&&(t.visible=!0)}),this.planets.forEach(t=>{if(t.userData.level===e){this.primaryPlanet!==void 0&&(this.primaryPlanet.visible=!1),this.primaryPlanet=t,this.gameState.track=this.primaryPlanet.children.filter(n=>n.name.includes("ring")),this.gameState.currentAchivementTracking=this.primaryPlanet.userData.achievements;const i=this.primaryPlanet.children.find(n=>n.name.includes("ring")&&n.userData.number===0);this.gameState.setCurrentRing(i),this.primaryPlanet.visible=!0,this.renderer.setClearColor(t.userData.worldBackDrop)}})}setTrack(e){this.gameState.setCurrentPlanetTrack(e),P(this.gameState.planetTrack,this.gameState.difficulty)}removeWorldObject(e){this.scene.remove(e);const t=this.threeObjects.indexOf(e);t!==-1&&this.threeObjects.splice(t,1)}checkForFullScreen(){const e=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,t=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);e===!1&&t&&this.gameState.currentState!=="paused"&&(this.gameState.previousState=this.gameState.currentState,this.gameState.currentState="paused",document.getElementById("alert")&&document.getElementById("alert").classList.remove("hidden")),e===!0&&t&&this.gameState.currentState==="paused"&&(this.gameState.currentState=this.gameState.previousState,document.getElementById("alert")&&document.getElementById("alert").classList.add("hidden"))}updateViewVector(){const e=new THREE.Vector3(-120,0,-120),t=new THREE.Vector3(120,0,120);this.sunViewVector=new THREE.Vector3().subVectors(this.camera.getCamera().position,e).normalize(),this.moonViewVector=new THREE.Vector3().subVectors(this.camera.getCamera().position,t).normalize(),this.scene.children.forEach(i=>{i.name==="sun-glow"&&(i.material.uniforms.viewVector.value=this.sunViewVector),i.name==="moon-glow"&&(i.material.uniforms.viewVector.value=this.moonViewVector)})}update(){requestAnimationFrame(()=>this.update()),this.camera.getCamera()!==null&&this.updateViewVector(this.camera.getCamera()),document.hidden&&this.gameState.currentState==="playing"&&(this.movement.setMenuPlacement(!0),this.gameState.hideExitButton());let e=Math.round(this.FPS*Date.now()/1e3);if(!(e<=this.prevTick)&&(this.prevTick=e,this.checkForFullScreen(),this.stats.update(),this.gameState.currentState!=="paused")){const t=Date.now(),i=(t-this.previousTime)/1e3;this.previousTime=t,this.primaryPlanet.name==="Mars"&&this.primaryPlanet.children[0].children[0].material.uniforms!==void 0&&(this.primaryPlanet.children[0].children[0].material.uniforms.time.value+=.1*i),this.scene.children.forEach(n=>{n.name.includes("particle")&&(n.position.add(n.userData.velocity),n.material.opacity-=.01,n.material.opacity<=0&&(n.material.opacity=0,n.visible=!1,n.userData.velocity.set(0,0,0)),n.rotation.x+=.02,n.rotation.y+=.01)}),this.primaryPlanet.children.forEach(n=>{n.name.includes("ring")&&(n.children[0].material.uniforms.time.value+=.1*i,this.dragon&&this.dragon.getDragon()!==void 0&&this.gameState.difficulty<=2&&(n.rotation.z=this.dragon.getDragon().rotation.y,n.lookAt(this.dragon.getDragon().position),n.rotateX(Math.PI/2)))}),this.dragon&&this.dragon.getDragon()!==void 0&&(this.movement.changeDirection(i),this.movement.update(i),this.movement.tiltDragon(i),this.movement.setArrowPosition(this.arrowPointer,this.gameState.currentRing),this.movement.updateSkyColor(this.dragon.getDragon().position,this.renderer,this.fog,this.gameState.planets[this.gameState.planet-1]),this.gameState.currentState==="playing"&&(this.gameState.raceTrackTime=((t-this.gameState.raceStartTime)/1e3).toFixed(2),document.getElementById("racetime").innerText=this.gameState.raceTrackTime,document.getElementById("ringCounter").innerText=Number(Number(this.gameState.currentRing.userData.number))+"/"+this.gameState.track.length,this.gameState.checkCurrentRing(this.dragon.getDragon().position,this.sparks))),(this.gameState.currentState==="menu"||this.gameState.currentState==="scoreboard")&&this.primaryPlanet!==void 0&&this.editMode===!1&&(this.primaryPlanet.rotation.x+=.1*i,this.primaryPlanet.rotation.y+=.1*i,this.primaryPlanet.rotation.z+=.1*i,this.primaryPlanet.rotation.x>=Math.PI*2&&(this.primaryPlanet.rotation.x=0,this.primaryPlanet.rotation.y=0,this.primaryPlanet.rotation.z=0)),this.gameState.currentState==="scoreboard"&&(document.getElementsByClassName("mainScore")[0].innerHTML=this.gameState.raceTrackTime);for(const n of this.updateFunctions)n(i);this.renderer.render(this.scene,this.camera.getCamera())}}handleWindowResize=()=>{console.log("handling resize!");const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.getCamera().aspect=e/t,this.camera.getCamera().updateProjectionMatrix()};start(){this.stats=new Stats,this.stats.showPanel(0),document.body.appendChild(this.stats.dom),this.update()}}class j{static SceneManager;static socket;constructor(){this.SceneManager=new N,this.SceneManager.handleWindowResize(),window.addEventListener("resize",this.SceneManager.handleWindowResize)}}const c=new j;function W(){/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?c.SceneManager.gameState.device="mobile":c.SceneManager.gameState.device="desktop"}function $(){document.getElementById("gui").style.display="none";const s=document.getElementById("items-container"),e=document.createElement("custom-selector");e.setAttribute("items",JSON.stringify(c.SceneManager.gameState.difficulties)),e.setAttribute("title","Difficulty"),e.setAttribute("selector","difficulty"),e.setAttribute("update",c.SceneManager.gameState.setDifficulty),document.getElementById("items-container").appendChild(e);const t=document.createElement("custom-selector");t.setAttribute("items",JSON.stringify(c.SceneManager.gameState.planets)),t.setAttribute("title","Planet"),t.setAttribute("selector","planet"),t.setAttribute("update",c.SceneManager.setPrimaryPlanet),document.getElementById("items-container").appendChild(t);const i=document.createElement("custom-selector");i.id="trackSelector",i.setAttribute("items",JSON.stringify(c.SceneManager.gameState.planets[c.SceneManager.gameState.planet-1].tracks)),i.setAttribute("title","Track"),i.setAttribute("selector","track"),i.setAttribute("update",c.SceneManager.setTrack),document.getElementById("items-container").appendChild(i);const n=document.createElement("div");n.classList.add("play-button-container");const a=document.createElement("button");a.classList.add("play-button"),a.innerHTML="PLAY",n.appendChild(a),s.appendChild(n),a.addEventListener("click",()=>{c.SceneManager.gameState.currentState==="menu"&&(c.SceneManager.gameState.resetGameStates(),I(),c.SceneManager.movement.setFlightPlacement(),c.SceneManager.rotatePlanetToInitialPosition())},!1)}function I(){if(console.log(screen.orientation),/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){const e=document.querySelector("body");(e.requestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen).call(e),screen.orientation.lock("landscape-primary")}}function Y(){const s=document.createElement("div");s.id="alert",s.classList.add("hidden"),s.innerHTML='<span>This game needs to run fullscreen.<br>Please click the button below to enter fullscreen mode.</span><button class="play-button" id="fullscreen-button">Fullscreen</button>',document.body.appendChild(s),document.getElementById("fullscreen-button").addEventListener("click",()=>{I(),c.SceneManager.gameState.setGameState(c.SceneManager.gameState.previousState),document.getElementById("alert").classList.add("hidden")})}function K(){const s=document.createElement("div");s.id="scoreboard",s.innerHTML=`
		<div class="scoreboard">
			<div id="scoredata">
			</div>
			<div class="flip-container">
			<div class="flip-card">
				<div class="flip-card-inner">
				<div class="flip-card-front">
					<!-- Front content goes here -->
			<div id="medal" class="parallax-container">
					<div class="parallax-layer coin-back"></div>
			<div class="parallax-layer coin-front"><div class="dodge"></div><div class="rough"></div><div id="medal-quality" class="quality">GOLD</div><div id="medal-shade" class="quality-shade">GOLD</div></div></div>
					<div class="ribbon">
					<div class="ribbon-default ribbon-left"></div>
					<div class="ribbon-default ribbon-right"></div>
					</div>
				</div>
				</div>
			</div>
			</div>
			<div id="allRingTimes">
			</div>
		</div>
	`;const e=document.createElement("div");e.classList.add("buttons");const t=document.createElement("button");t.classList.add("play-button"),t.innerText="Play Again",t.addEventListener("click",()=>{c.SceneManager.gameState.resetGameStates(),c.SceneManager.gameState.hideScoreboard(),c.SceneManager.movement.setFlightPlacement(),c.SceneManager.rotatePlanetToInitialPosition()}),e.appendChild(t);const i=document.createElement("button");i.classList.add("play-button"),i.innerText="Return to menu",i.addEventListener("click",()=>{c.SceneManager.gameState.setGameState("menu"),c.SceneManager.gameState.hideScoreboard(),c.SceneManager.gameState.positionMenuAndScene(!0)}),e.appendChild(i),s.appendChild(e),document.body.appendChild(s);const n=document.querySelector(".flip-card"),a=document.querySelector(".coin-back"),o=document.querySelector(".dodge"),r=document.querySelector(".rough");let d=0;function h(m,u){n.style.transform=`rotateY(${m}deg) rotateX(${u}deg)`;const p=Math.sin(u*(Math.PI/180)),E=Math.sin(-m*(Math.PI/180));a.style.transform=`translateX(${E*15}px) translateY(${p*15}px)`,o.style.backgroundPosition=Number(50+m)+"% "+Number(50+u)+"%",r.style.backgroundPosition=Number(50+m)+"% "+Number(50+u)+"%"}function l(){let m=0;d=0,setInterval(()=>{m+=.01,d<20&&(d+=.5),h(Math.sin(m)*d,Math.cos(m)*d)},10)}l()}function Q(){const s=document.getElementById("controls");s.innerHTML=c.SceneManager.gameState.getControls(),s.addEventListener("click",()=>{c.SceneManager.gameState.setNextControl(),console.log(c.SceneManager.gameState)})}function X(){const s=document.createElement("button");s.id="exit-button",s.innerHTML="✖",s.addEventListener("click",()=>{c.SceneManager.gameState.setGameState("menu"),c.SceneManager.movement.setMenuPlacement(!0),c.SceneManager.gameState.hideExitButton(),c.SceneManager.gameState.resetGui()}),document.body.appendChild(s)}function _(){document.getElementById("boost").addEventListener("click",()=>{c.SceneManager.movement.fireBoost()})}$();K();Q();X();Y();W();_();console.log("cool.");const J=`
  <div class="carousel-container">
    <div class="carousel-title"></div>
    <div class="carousel-box">
      <button class="carousel-button prev-btn">&lt;</button>
      <div class="carousel-item current-item"></div>
      <button class="carousel-button next-btn">&gt;</button>
    </div>
  </div>
  <div class="description"></div>
`,Z=`
  <style>
    .carousel-container {
      display: flex;
      align-items: self-start;
      flex-direction: column;
    }

    .carousel-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;
    }

    .carousel-item {
      min-width: 200px;
	  font-size:10px;
    }

    .carousel-buttons {
      display: flex;
    }

    .carousel-button {
        margin-right: 5px;
        user-select: none;
        cursor: pointer;
        display: block;
        text-align: center;
        text-decoration: none;
        color: #fff;
        background-size: 300% 300%;
        color: white;
        color: white;
	    border: 1px solid #2d142c;
        height: 25px;
        width: 25px;
        text-align: center;
        background-image: linear-gradient(to right, #801336 0%, #c72c41 50%, #ee4540 100%);
	transition: background-position 0.5s;
	font-family: 'Montserrat', sans-serif;
	box-shadow: inset 0px 0px 10px 0px #ee4540;
    }

    .carousel-button:hover {
        background-position: right center;
    }

    .carousel-title {
        padding-left: 30px;
        font-weight:bold;
		padding-bottom:5px;
		font-size:12px
    }

    .description {
        padding-left: 30px;
        margin-bottom: 15px;
        font-style: italic;
        opacity:0.5;
        font-size: 12px;
    }

    .disabled {
      opacity: 0.25;
      pointer-events: none;
    }
  </style>
`;class ee extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Z+J,this.carouselItems=[],this.currentItemIndex=0,this.onSelectCallback=null,this.gameState=new R,this.selector=null}static get observedAttributes(){return["items","title","selector","update"]}connectedCallback(){this.updateCarousel(),this.shadowRoot.querySelector(".prev-btn").addEventListener("click",this.prevItem.bind(this)),this.shadowRoot.querySelector(".next-btn").addEventListener("click",this.nextItem.bind(this))}attributeChangedCallback(e,t,i){e==="items"?(this.carouselItems=JSON.parse(i),this.currentItemIndex=0,this.updateCarousel()):e==="title"?this.shadowRoot.querySelector(".carousel-title").textContent=i:e==="selector"&&(this.selector=i)}parseFunction(e){const t=[],i=e.slice(e.indexOf("{")+1,e.lastIndexOf("}"));return new Function(...t,i)}updateCarousel(){const e=this.carouselItems[this.currentItemIndex],t=this.shadowRoot.querySelector(".current-item");t.textContent=e.name,this.shadowRoot.querySelector(".description").textContent=e.description;const i=this.shadowRoot.querySelector(".prev-btn"),n=this.shadowRoot.querySelector(".next-btn");this.currentItemIndex===0?i.classList.add("disabled"):i.classList.remove("disabled"),this.currentItemIndex===this.carouselItems.length-1?n.classList.add("disabled"):n.classList.remove("disabled")}prevItem(){this.currentItemIndex>0&&(this.currentItemIndex--,this.updateCarousel(),this.shadowRoot.querySelector(".carousel-container").classList.add("slide-right"),setTimeout(()=>{this.shadowRoot.querySelector(".carousel-container").classList.remove("slide-right")},500),this.setItem())}nextItem(){this.currentItemIndex<this.carouselItems.length-1&&(this.currentItemIndex++,this.updateCarousel(),this.shadowRoot.querySelector(".carousel-container").classList.add("slide-left"),setTimeout(()=>{this.shadowRoot.querySelector(".carousel-container").classList.remove("slide-left")},500),this.setItem())}setItem(){const e="set"+this.selector.charAt(0).toUpperCase()+this.selector.slice(1);this.gameState[e](this.carouselItems[this.currentItemIndex].level)}}customElements.define("custom-selector",ee);
