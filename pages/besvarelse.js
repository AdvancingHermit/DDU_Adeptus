import Link from 'next/link';
import clientPromise from "../lib/mongodb";

export default function Opgaver({ assignments }) {

    function CheckAnswer(bId) {
        console.log(assignments.find(a => a._id == bId).correctAnswer)
        const ansInput = document.getElementById(bId).value;
        const asAns = assignments.find(a => a._id == bId).correctAnswer;
        console.log(asAns);
        console.log(ansInput)
        if (ansInput == asAns) {
            alert("Rigtigt svar!");
        } else {
            alert("Forkert svar!");
        }
    }


    return (
        <div>

            <h1>Bedste Opgaver Nogensinde</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>
            <div id="ass">
                {assignments.map((assignment) => (
                    <>
                        <div>
                            <h2>{assignment.assignmentText}</h2>
                            <form>
                                <label>
                                    Dit Svar:
                                    <input type="text" name="answer" id={assignment._id} />
                                </label>
                            </form>
                            <button onClick={() => CheckAnswer(assignment._id)} > Check Answer</button>
                        </div>
                    </>
                ))}
            </div>
            
            <style jsx>{`
            #ass {
                display: flex;
                flex-direction: column;
                }
            #ass > div {
                margin-bottom: 100px;
                margin-left: 10px;
            }
            `
            }
            </style>
        </div>

    );
}


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const assignments = await db
            .collection("singles")
            .find({})
            .sort({})
            .limit(5)
            .toArray();

        return {
            props: { assignments: JSON.parse(JSON.stringify(assignments)) },
        };
    }

    catch (e) {
        console.error(e);
    }
}


