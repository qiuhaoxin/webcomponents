export function getWindowWidth(){
	return typeof window!=='undefined' ? window.innerWidth : 0; 
}
export function getWindowHeight(){
	return typeof window !=='undefined' ? window.innerHeight :0 ;
}

export function getIEVersion(){
	if(typeof global.window==='undefined'||typeof global.window.navigator==='undefined'){
       return undefined;
	}
	const match=global.window.navigator.userAgent.match(/(?:MSIE|Trident\/.*;rv:)(\d+)/);
	return match ? parseInt(match[1],10):undefined;
}
export function translate(str,replaceString=null){
   if(!str){
   	return "";
   }
   let translated=str;
   if(replaceString){
   	  Object.keys(replaceString).forEach(placeholder=>{
   	  	translated=translated.replace(placeholder,replaceString[placeholder]);
   	  });
   }
   return translated;
}
