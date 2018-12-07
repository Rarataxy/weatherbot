module.exports = {
 colors: function colors(){
    let kolors = ['#b53000','#e0af00','#b1e800','#1daa11','#09b774','#1092ba','#262da8','#7228a3','#bf1cae','#d30860','#c41717'];
    let random = kolors[Math.floor(Math.random()*kolors.length)];
    return random;
  }
}