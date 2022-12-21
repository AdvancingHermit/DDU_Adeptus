import Link from 'next/link';


export default function Assignments() {
    let currentAssID = "";



    const createInput = async () => {
        const atInput = document.getElementById("assignmentText").value;
        const caInput = document.getElementById("correctAnswer").value;
        const res = await fetch("/api/addSingle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assignmentText: atInput,
                correctAnswer: caInput,
                assSetID: currentAssID,
            }),
        });

        const data = await res.json();
        console.log(data);
    };

    const createAssSet = async () => {
        const assSetName = document.getElementById("assName").value;
        const assSetClass = document.getElementById("assClass").value;
        console.log(assSetName);
        console.log(assSetClass);

        const res = await fetch("/api/addAssSet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: assSetName,
                assClass: assSetClass,
            }),
        });

        console.log("I Made it");
        const data = await res.json();
        console.log("I Made it a bit longer");
        currentAssID = data.assSet._id;
        console.log("I Made it way Longer");
        console.log(data);
        console.log(currentAssID);
    };


    return (
        <>
        <div id="primary">
            <h1>Opret opgavesæt</h1>

            <form>
                <label>
                    Navn på opgavesæt:
                    <input type="text" name="assignmentSetID" id="assName" />
                </label>
                <br />
                <label>
                    Klasse som opgavesættet skal tilhøre:
                    <input type="text" name="assignmentSetName" id="assClass" />
                </label>
            </form>
            <button onClick={createAssSet}>Lav opgavesæt</button>
            <br />
            


            <form>
                <label>
                    Spørgsmål:
                    <input type="text" name="assignmentText" id="assignmentText" />
                </label>
                <br/>
                <label>
                    Svar:
                    <input type="text" name="correctAnswer" id="correctAnswer" />
                </label>
            </form>
            <br/>
            <button onClick={createInput}>Opret opgave</button>

            </div>
        </>
    );
}