console.log('works');


document.querySelector('.sendImg').addEventListener('click', function(event){
    console.log('works');
    fetch('http://127.0.0.1:3000/uploadfile',{
    method: 'POST',
    body: JSON.stringify({name:'adriano', tes: 'hello'}),
    headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()));
})




