// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Problem is here between these + signs

            
const taskDone = document.querySelectorAll('.mark-done')

Array.from(taskDone).forEach((element) =>{
    element.addEventListener('click', markComplete)
})
 
// taskDone.forEach(function (button){
//     button.addEventListener('click',markComplete)
// })


async function markComplete(){
    const taskSelect = this.closest('.container').querySelectorAll('span')[0].innerText;
    
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskFromJS': taskSelect
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
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
