const questions = [
  {q:"Which Python function gives the number of items in a list?", o:["size()","len()","count()","length()"], a:1},
  {q:"What is the median of 3, 9, 5, 1, 7?", o:["5","7","9","1"], a:0},
  {q:"Which symbol starts a comment in Python?", o:["//","<!--","#","/*"], a:2},
  {q:"What does standard deviation measure?", o:["The middle value","How spread out data is","The most common value","The total of all values"], a:1},
  {q:"Which SQL command reads data from a table?", o:["GET","FETCH ROW","OPEN","SELECT"], a:3},
  {q:"What is the output of 10 // 3 in Python?", o:["3.33","3","4","1"], a:1}
];
let index = 0, score = 0;
const $ = id => document.getElementById(id);

function show(){
  const item = questions[index];
  $("progress").textContent = `Question ${index+1} of ${questions.length}`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("next").hidden = true;
  $("options").innerHTML = "";
  item.o.forEach((text,i)=>{
    const b = document.createElement("button");
    b.className = "opt"; b.textContent = text;
    b.onclick = () => choose(i);
    $("options").appendChild(b);
  });
}
function choose(i){
  const item = questions[index];
  const btns = document.querySelectorAll(".opt");
  btns.forEach(b => b.disabled = true);
  btns[item.a].classList.add("correct");
  if(i === item.a){ score++; $("feedback").textContent = "Correct!"; }
  else { btns[i].classList.add("wrong"); $("feedback").textContent = "Not quite. The right answer is highlighted."; }
  $("next").textContent = index === questions.length-1 ? "See my score" : "Next question";
  $("next").hidden = false;
}
$("next").onclick = () => {
  index++;
  if(index < questions.length) show(); else finish();
};
function finish(){
  $("quiz").hidden = true; $("result").hidden = false;
  $("score").textContent = `You scored ${score} out of ${questions.length}`;
  $("message").textContent = score >= 5 ? "Excellent work!" : score >= 3 ? "Good effort. Try again to improve." : "Keep practising and try again.";
}
$("restart").onclick = () => {
  index = 0; score = 0;
  $("result").hidden = true; $("quiz").hidden = false; show();
};
show();
