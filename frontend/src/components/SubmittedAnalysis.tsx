import React from 'react';
import { Box, Grid, Heading, Text, Link, VStack, UnorderedList, ListItem } from "@chakra-ui/react";

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
    if (!response) {
        return null;
    }

    return (
        <Grid templateColumns="1fr 1fr" gap={6} p={4} bg="gray.100">

        {/* Left Side: Resume Text and Strength */}
        <VStack spacing={4} align="stretch">
            <Box bg="white" p={6} shadow="lg" rounded="lg">
            <Heading as="h2" size="lg" mb={2}>
                Resume Text
            </Heading>
            <Text color="gray.700">
            <strong>Resume Text:</strong> 
            {highlightText(response.resume_text, response.numbers_query, response.verbs_query)}
        </Text>
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
