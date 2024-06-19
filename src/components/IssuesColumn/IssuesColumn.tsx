import {Issue, statuses} from "../../utils/helpers.ts";

import IssueCard from "../IssueCard/IssueCard.tsx";
import styles from "./IssuesColumn.module.css"
import {Droppable} from "react-beautiful-dnd";

type Props = {
    status:string;
    issues:Issue[],
    key: string;
    index:number

}
const IssuesColumn = ({status, issues, index}:Props) => {
    console.log(issues)
    return (
        <div className={styles.column} role="column">
            <p className={styles.title}>{statuses[status]}</p>
            <Droppable key={index.toString()} droppableId={status}>
                {(provided) => (
                    <div className={styles.cardsCont} ref={provided.innerRef} {...provided.droppableProps} data-testid="column">
                        {issues.map((issue, id) => <IssueCard issue={issue} key={issue.id.toString()} index={id}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default IssuesColumn;