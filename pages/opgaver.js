import Link from 'next/link';

export default function Assignments() {

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
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <>
            <h1>Lav opgaver her</h1>
            <h2>
                <Link href="/">Gå tilbage til hovedmenu</Link>
            </h2>

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
            <button onClick={createInput}>Create Assignment With Input</button>

        </>
    );
}