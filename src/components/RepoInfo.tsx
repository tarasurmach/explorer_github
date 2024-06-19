import {useRepoInfo} from "../store/store.ts";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Text} from "@chakra-ui/react";
import {ChevronRightIcon, StarIcon} from "@chakra-ui/icons";

import {getStarsCount} from "../utils/helpers.ts";
import {URLs} from "../utils/constants.ts";


const RepoInfo = () => {
    const repoInfo = useRepoInfo();
    const {owner, name, stargazers_count, language, description} = repoInfo;


    
    return owner ?  (
        <Flex direction={"column"} gap={"0.1rem"}>
            <HStack data-testid="repoinfo" gap={"1rem"}>
                <Breadcrumb spacing={4} separator={<ChevronRightIcon color='gray.500' pb={"0.1rem"}/>}>
                    <BreadcrumbItem data-testid="owner">
                        <BreadcrumbLink href={URLs.REPO_URL(owner)}>{owner.charAt(0).toUpperCase() + owner.slice(1)}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={URLs.REPO_URL(owner, name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</BreadcrumbLink>
                    </BreadcrumbItem>

                </Breadcrumb>
                <HStack gap={"0.2rem"}>
                    <Text >{getStarsCount(stargazers_count)}</Text>
                    <StarIcon color={"#ffd54e"} pb={"0.1rem"}/>
                </HStack>
                <Text color={"#ffbc3e"}>
                    Primary language: {language}
                </Text>


            </HStack>
            <Text m={"0 0 20px 40px"}>
                About: {description}
            </Text>
        </Flex>
    ) : <HStack data-testid="empty" h={56}>&nbsp;&nbsp;</HStack>;
};

export default RepoInfo;