const a = parseInt(0);
const b = parseInt(0);
const chan = [];
const le = [];
function demSo(a,b){
    for (let i = a; i <= b; i++) {
        if (i % 2 === 0) {
            chan.push(i); 
        } else {
            le.push(i); 
        }
    }
    
    console.log("Các số chẵn:", chan);
    console.log("Các số lẻ:", le);
}
demSo(1,100)
