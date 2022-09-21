var firebaseConfig = {
  apiKey: "AIzaSyCSkDppXduvnhIYgby9xDloNivKh2erfmU",
  authDomain: "kwitter-779f1.firebaseapp.com",
  databaseURL: "https://kwitter-779f1-default-rtdb.firebaseio.com",
  projectId: "kwitter-779f1",
  storageBucket: "kwitter-779f1.appspot.com",
  messagingSenderId: "225000484829",
  appId: "1:225000484829:web:fe072adbded8890787d034"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var user_name=localStorage.getItem("user_name");
var room_name=localStorage.getItem("room_name");

function send(){
  msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
  });
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code


console.log(firebase_message_id);
console.log(message_data);

name1 = message_data["name"];
message = message_data["message"];
like=  message_data["like"];

var name_tag = "<h4>"+name1+"</h4>";
var message_tag = "<h4 class='message_h4'>"+message+"</h4>";
var like_tag ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>Likes :"+ like +"</button>";
row = name_tag+message_tag+like_tag;
document.getElementById("output").innerHTML += row;

//End code
  } });  }); }
getData();
function updateLike(message_id){
  console.log(message_id);
  button_id = message_id;
  likes= document.getElementById(button_id).value;
update_Like= Number(likes)+1;
firebase.database.ref(room_name).chlid(message_id).update({ like : updated_likes });


}
function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location="index.html";
