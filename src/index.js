const choresUrl = "http://localhost:3000/chores"

const choreList = document.getElementById( "chore-list" );
const newChoreForm = document.getElementById( "new-chore-form" );

function fetchChores() {
    return fetch( choresUrl ).then( response => response.json() );
}

function renderChore( chore ) {
    const thisChoreCard = document.createElement( "div" );
    thisChoreCard.classList.add( "chore-card" );
    const thisChoreDeleteButton = document.createElement( "button" );
    thisChoreDeleteButton.classList.add( "delete-button" );
    thisChoreDeleteButton.dataset.id = chore.id;
    thisChoreDeleteButton.textContent = "X"
    const thisChoreTitle = document.createElement( "h3" );
    thisChoreTitle.textContent = chore.title;
    const thisChoreDuration = document.createElement( "p" );
    thisChoreDuration.textContent = `Duration: ${ chore.duration }`
    const thisChorePriority = document.createElement( "input" );
    thisChorePriority.value = chore.priority;
    thisChoreCard.append( thisChoreDeleteButton, thisChoreTitle, thisChoreDuration, thisChorePriority );
    choreList.append( thisChoreCard );
}

function postChore( chore ) {
    return fetch( choresUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify( chore ) } ).then( response => response.json() );
}

function createChore( choreFormSubmission ) {
    choreFormSubmission.preventDefault();
    const newChore = {
        title: choreFormSubmission.target.elements.title.value,
        priority: choreFormSubmission.target.elements.priority.value,
        duration: choreFormSubmission.target.elements.duration.value
    };
    postChore( newChore ).then( renderChore );
    newChoreForm.reset();
}

function deleteChore( choreID ) {
    fetch( `${ choresUrl }/${ choreID }`, { method: "DELETE" } );
    document.querySelector( `button[data-id="${ choreID }"]` ).closest( "div" ).remove();
}

document.addEventListener( "DOMContentLoaded", () => {
    fetchChores().then( choreData => choreData.forEach( chore => renderChore( chore ) ) );
    newChoreForm.addEventListener( "submit", createChore );
    choreList.addEventListener( "click", choreClick => {
        if ( choreClick.target.className === "delete-button" ) { deleteChore( choreClick.target.dataset.id ) }
    } )
} );