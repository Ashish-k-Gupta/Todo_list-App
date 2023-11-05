
const taskDone = document.querySelectorAll('.mark-done')

// taskDone.addEventListener('click', markComplete)

taskDone.forEach(function (button){
    button.addEventListener('click',function(){
        const taskText = this.closest('.container').querySelector('span.thisText');
        if(taskText.style.textDecoration === 'line-through' && taskText.style.color === 'grey'){

            taskText.style.textDecoration = 'none'
            taskText.style.color = 'white'
        }else{
            taskText.style.textDecoration = 'line-through'
            taskText.style.color = 'grey'
        }
    } )
    
})

// async function markComplete(){
//     const taskText = this.closest('.container').querySelectorAll('span:not(.completed)').innerText
//     alert(taskText)
//     // try{
//     //     const response = await fetch('markComplete', {
//     //         method: 'put',
//     //     })
//     // }
// }

 
const deleteButtons = document.querySelectorAll('.mark-delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
         const taskId = this.getAttribute('data-task-id');

     
         fetch('/tasks/' + taskId, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse JSON for successful responses
            } else {
                return response.text(); // Parse text for error responses
            }
        })
        .then(data => {
            if (typeof data === 'object') {
                // Handle JSON response
                if (data.message === 'Task deleted') {
                    // Task deleted successfully
                    const taskElement = this.parentNode.parentNode;
                    taskElement.remove();
                    location.reload();
                } else {
                    console.error(data.message); // Handle other messages
                }
            } else {
                // Handle plain text response (e.g., error messages)
                console.error(data);
            }
        })
        .catch(error => console.error(error));
        
    })
})



   /*  fetch('/tasks' + taskId,{
            method: 'DELETE',
         })
         .then(response => response.json())
         .then(data => {
            if(data.message === 'Task deleted'){
                const taskElement = this.parentNode.parentNode;
                taskElement.remove()
            }else {
                console.error(data.message); // Handle errors
            }
         })
         .catch(error => console.error(error)); */


// const { response } = require("express")
/* 
const deleteButton = document.querySelector('#delete-button')



deleteButton.addEventListener('click', _ => {
    fetch('/tasks',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'task'
        })
    })

    .then(res=>{
        if(res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})
 */
