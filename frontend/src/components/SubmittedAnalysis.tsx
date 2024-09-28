import React, { useState } from 'react';
import { Box, Grid, Heading, Text, Link, VStack, UnorderedList, ListItem, Button,
HStack } from "@chakra-ui/react";

interface SearchResult {
    employer_name: string;
    location: string;
    url: string;
}

interface JobOpportunity {
    job_title: string;
    search_results: SearchResult[];
}

interface ResumeResponse {
    resume_text: string;
    numbers_query: string[];
    verbs_query: string[];
    resume_strength: string;
    job_opportunities: JobOpportunity[];
    recommended_youtube_videos: string[];
}

interface SubmittedAnalysisProps {
    response: ResumeResponse | null;
}

const highlightText = (text: string, numbersQuery: string[], verbsQuery: string[]) => {
    return text.split(/(\W+)/).map((word, index) => {
      if (numbersQuery.some(query => word.includes(query))) {
        return (
          <Box as="span" key={index} bg="green.100" px="2" py="1" rounded="full">
            {word}
          </Box>
        );
      } 
      else if (verbsQuery.includes(word)) {
        return (
          <Box as="span" key={index} bg="blue.100" px="2" py="1" rounded="full">
            {word}
          </Box>
        );
      }
      return word;
    });
  };
  

const SubmittedAnalysis: React.FC<SubmittedAnalysisProps> = ({ response }) => {

    const [showNumbers, setShowNumbers] = useState(true);
    const [showVerbs, setShowVerbs] = useState(true);

    const toggleNumbers = () => setShowNumbers(!showNumbers);
    const toggleVerbs = () => setShowVerbs(!showVerbs);

    if (!response) {
        return null;
    }

    return (
        <Grid templateColumns="1fr 1fr" gap={6} p={4} bg="gray.100">

        {/* Left Side: Resume Text and Strength */}
        <VStack spacing={4} align="stretch">
            <Box bg="white" p={6} shadow="lg" rounded="lg">
                <HStack mb={3}>
                <Heading as="h2" size="lg" mb={2} mr={3}>
                    Resume Text
                </Heading>
                <Box>
                    <Button
                    onClick={toggleNumbers}
                    mr={2}
                    size="sm"
                    variant={showNumbers ? 'solid' : 'ghost'}
                    bg={showNumbers ? 'green.200' : 'green.100'}
                    fontWeight={showNumbers ? 'bold' : 'normal'}
                    color="black"
                    >
                    {showNumbers ? 'Hide Numbers' : 'Show Numbers'}
                    </Button>
                    <Button
                    onClick={toggleVerbs}
                    size="sm"
                    variant={showVerbs ? 'solid' : 'ghost'}
                    bg={showVerbs ? 'blue.200' : 'blue.100'}
                    fontWeight={showVerbs ? 'bold' : 'normal'}
                    color="black"
                    >
                    {showVerbs ? 'Hide Verbs' : 'Show Verbs'}
                    </Button>
                </Box>
            </HStack>
            <Box p={4} borderWidth="1px" borderRadius="lg">
                {highlightText(
                response.resume_text,
                showNumbers ? response.numbers_query : [],
                showVerbs ? response.verbs_query : []
                )}
            </Box>
            </Box>
            <Box bg="white" p={6} shadow="lg" rounded="lg">
            <Heading as="h2" size="lg" mb={2}>
                Resume Strength
            </Heading>
            <Text color="gray.700">
                <strong>Strength:</strong> {response.resume_strength}
            </Text>
            </Box>
        </VStack>

        {/* Right Side: Job Opportunities and YouTube Recommendations */}
        <VStack spacing={4} align="stretch">
            <Box bg="white" p={6} shadow="lg" rounded="lg">
            <Heading as="h2" size="lg" mb={4}>
                Job Opportunities
            </Heading>
            {response.job_opportunities && response.job_opportunities.length > 0 ? (
                <UnorderedList spacing={3}>
                {response.job_opportunities.map((job, index) => (
                    <ListItem key={index}>
                    <Text fontWeight="semibold" color="gray.900">{job.job_title}</Text>
                    {job.search_results && job.search_results.length > 0 ? (
                        <UnorderedList ml={4}>
                        {job.search_results.map((result, idx) => (
                            <ListItem key={idx} color="gray.600">
                            <Text color="gray.800">
                                Company: {result.employer_name || "Unknown"}
                            </Text>
                            <Text>Location: {result.location || "Location not available"}</Text>
                            <Link href={result.url} color="blue.500" isExternal>
                                View Job Posting
                            </Link>
                            </ListItem>
                        ))}
                        </UnorderedList>
                    ) : (
                        <Text color="gray.500">No results found for this job.</Text>
                    )}
                    </ListItem>
                ))}
                </UnorderedList>
            ) : (
                <Text color="gray.500">No job opportunities available at the moment.</Text>
            )}
            </Box>

            <Box bg="white" p={6} shadow="lg" rounded="lg">
            <Heading as="h3" size="lg" mb={4}>
                YouTube Recommendations
            </Heading>
            <Text color="gray.700">
                <strong>Recommendations:</strong> {response.recommended_youtube_videos.join(", ")}
            </Text>
            </Box>
        </VStack>

    </Grid>
    );
};

export default SubmittedAnalysis;
