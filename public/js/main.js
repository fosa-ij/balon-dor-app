const deleteData = document.querySelector('#delete')
const updateButton = document.querySelector('#update')
// const deleteValue = document.querySelector('#yearToDelete').value

deleteData.addEventListener('click', async _ => {
    const deleteValue = document.querySelector('#yearToDelete').value
    try{
        let results = await fetch('/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                year: deleteValue
            })
        })
        if (results.ok){
            console.log(await results.json())
            window.location.reload()
        }
    }
    catch(err){
        console.error(err);
    }
})

updateButton.addEventListener('click', async _ => {
    const year = document.querySelector('#year').value
    const name = document.querySelector('#name').value
    const goals = document.querySelector('#goals').value
    const assits = document.querySelector('#assits').value
    const apps = document.querySelector('#apps').value
    const image = document.querySelector('#image').value
    const footballClub = document.querySelector('#footBall_club').value
    const nationality = document.querySelector('#nationality').value

    try{
        let results = await fetch('/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                year: year,
                name: name,
                goals: goals,
                assists: assits, 
                apps: apps,
                image: image,
                football_club: footballClub,
                nationality: nationality,

            })
        })
        if (results.ok) {
            await results.json()
            window.location.reload()
        }
    }
    catch(err){
        console.error(err);
    }
})