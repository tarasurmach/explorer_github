import {Issue} from "../../utils/helpers.ts";
import {Box, Flex, HStack, Link, Text} from "@chakra-ui/react";
import {Draggable} from "react-beautiful-dnd";

import styles from "./IssueCard.module.css"
import {DragHandleIcon} from "@chakra-ui/icons";

const IssueCard = ({issue, index}:{issue:Issue, index:number}) => {
    return (
        <Draggable draggableId={issue.id.toString()} index={index}>
            {(provided)=>(
                <Flex className={styles.card} ref={provided.innerRef} {...provided.draggableProps} role="card">
                    <Link href={issue.url}>
                        <Text color={"#ffbc3e"} textDecoration={'underline'} fontSize={"0.9em"}>{issue.title}</Text>
                    </Link>
                    <HStack justifyContent={"space-between"}>
                        <Text fontSize={"0.9em"} >№ {issue.number}</Text>
                        <Text fontSize={"0.8em"} color={"#646cff"} >{issue.closed_ago ? `closed ${issue.closed_ago}`: `updated ${issue.updated_ago}`}</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                        <Text fontSize={"0.8em"} >{issue.comments} comments</Text>
                        <span {...provided.dragHandleProps}> <DragHandleIcon boxSize={20}/> </span>
                    </HStack>
                </Flex>

            )}
        </Draggable>
    );
};


export default IssueCard;