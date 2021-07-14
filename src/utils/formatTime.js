export const formatTime = (arg) => {
  if(!arg || typeof(arg)!=='number' || arg<0){
    return null;
  }

  const s = Math.floor(arg%60).toString();
  const m = Math.floor((arg/60)%60).toString();
  const h = Math.floor((arg/3600)%60).toString();

  if (s.length<= 1 || m.length<= 1 || h.length<= 1){
    return (h.padStart(2,'0') + ':' + m.padStart(2,'0') + ':' + s.padStart(2,'0'));
  } else {
    return (h + ':' + m + ':' + s);
  }
};
