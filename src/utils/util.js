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

export function deepMerge(target,source={}){
   const extended=Object.assign({},target);
   Object.keys(source).forEach((key)=>{
      if(typeof source[key]!=='object' || !source[key]){
         extended[key]=source[key];
      }else{
         if(!target[key]){
            extended[key]=source[key];
         }else{
            extended[key]=deepMerge(target[key],source[key])
         }
      }
   });
   return extended;
}