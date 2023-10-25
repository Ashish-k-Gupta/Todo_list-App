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