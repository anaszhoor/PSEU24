import './Control.css'

interface IProps {
    data: Store.IQuestion[];
    feedback: string | null;
    indexQuestion: number;
    next: () => void;
    submit: () => void;
}

const Control = (props: IProps) => {
  return (
    <div>
        {props.feedback ? (
        <>
            <p className={`feedback ${props.feedback.startsWith("Correct") ? "correct" : "wrong"}`}>{props.feedback}</p>
            <button className='btn' onClick={props.next}>Next</button>
        </>
    ) : (
        <button className='btn' onClick={props.submit} >Submit</button>
    )}
    <p className='indexes'>{props.indexQuestion + 1} of {props.data.length} questions</p>
    </div>
  )
}

export default Control