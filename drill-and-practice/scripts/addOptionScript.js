const table = document.getElementById('optionTable').getElementsByTagName('tbody')[0];
const addOptionButton = document.getElementById('addOption');

addOptionButton.addEventListener('click', () => {
    addOptionButton.disabled = true;
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = `<textarea class="form-control" id="newOption" name="newOption" placeholder="Enter option" rows="1" cols="33" autofocus></textarea>`;
    cell2.innerHTML = `<input type="checkbox" class="form-check-input" name="isCorrect">`;
    cell3.innerHTML = `<div class="d-flex align-items-center gap-3"><button class="btn btn-outline-success submit-option"><i class="fa-solid fa-add"></i></button>` +
        `<button type="submit" class="btn btn-outline-danger delete-row"><i class="fa-solid fa-remove"></i></button></div>`;

    const deleteButton = cell3.querySelector('.delete-row');
    deleteButton.addEventListener('click', () => {
        table.deleteRow(newRow.rowIndex - 1);
        addOptionButton.disabled = false;
    });

    const submitOptionButton = cell3.querySelector('.submit-option');
    submitOptionButton.addEventListener('click', () => {
        const row = table.rows[table.rows.length-1];

        // Loop through rows and collect input data
        const tId = document.getElementById('topicId').value;
        const qId = document.getElementById('questionId').value;
        const option = row.querySelector('textarea[name="newOption"]').value;
        const isChecked = row.querySelector('input[name="isCorrect"]').checked;
        const data = { question: qId, option: option, isChecked: isChecked };

        // Send data to the server using fetch
        fetch('/api/options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                if (result.done) {
                    row.cells[0].innerHTML = option;
                    if (isChecked) {
                        row.cells[1].innerHTML = '<input type="checkbox" class="form-check-input" checked disabled>';
                    } else {
                        row.cells[1].innerHTML = '<input type="checkbox" class="form-check-input" disabled>';
                    }
                    row.cells[2].innerHTML = `<form method="POST" ` +
                        `action="/topics/${tId}/questions/${qId}/options/${result.id}/delete">` +
                        `<button type="submit" class="btn btn-outline-danger"><i class="fa-solid fa-remove"></i></button>` +
                        `</form>`;
                    addOptionButton.disabled = false;
                    const deleteQuestionDiv = document.getElementById('deleteQuestionDiv');
                    if (deleteQuestionDiv) {
                        deleteQuestionDiv.style.display = "none";
                    }
                } else {
                    row.cells[0].innerHTML = `<textarea class="form-control is-invalid" name="newOption" placeholder="Enter option" rows="1" cols="33" autofocus="autofocus" >${option}</textarea><div class="invalid-feedback">Option text should contain at least 1 character</div>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting data.');
            });
    });
    document.getElementById('newOption').focus();
});

