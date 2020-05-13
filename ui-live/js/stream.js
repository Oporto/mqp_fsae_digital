function updateVS(){
    fetch('https://rawdataendpoints-yyoqnujuaq-uk.a.run.app/processed_slice', {
      cache: "no-store"
    })
    .then((response) => response.json())
    .then((data) => {
      updateGForce((Math.random()-0.5)*5,(Math.random()-0.5)*5);
      updateStr((Math.random()-0.5)*90);
      updateBar((Math.random()-0.5)*30);
      
      extend(data.tr);
      updateThr((Math.random()));
      updateSpeed((Math.random())*90);
      updateGear(data.ge);
      updateTilt(data.tpoints, [(Math.random()*10).toFixed(2),(Math.random()*10).toFixed(2)]);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

var streamInterval = window.setInterval(updateVS,200);

function updateInt(tt){
  console.log("updating interval");
  clearInterval(streamInterval);
  streamInterval = window.setInterval(updateVS,tt);
}

document.getElementById("exampleRadioInline1").onclick = () => {updateInt(200)};
document.getElementById("exampleRadioInline2").onclick =  () => {updateInt(400)};
document.getElementById("exampleRadioInline3").onclick =  () => {updateInt(600)};
document.getElementById("exampleRadioInline4").onclick =  () => {updateInt(1000)};
document.getElementById("exampleRadioInline5").onclick =  () => {updateInt(1500)};
