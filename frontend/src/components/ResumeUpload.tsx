import React, { ChangeEvent, FormEvent, useEffect } from "react";
import SubmittedAnalysis from "./SubmittedAnalysis";
import { Box, Button, Input, Text, VStack, Heading, Flex, Spinner } from '@chakra-ui/react'

interface JobOpportunity {
    job_title: string;
    search_results: SearchResult[];
  }
  
  interface SearchResult {
    employer_name: string;
    location: string;
    url: string;
  }
  
  interface ResumeResponse {
    resume_text: string;
    numbers_query: string[];
    verbs_query: string[];
    youtube_query: string[];
    resume_strength: string;
    job_opportunities: JobOpportunity[];
    recommended_youtube_videos: string[];
}

interface ResumeUploadProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubmitted: (submitted: boolean) => void;
    error: string | null;
    response: ResumeResponse | null;
    submitted: boolean;
    resume: File | null;
    isLoading: boolean;
  }


const ResumeUpload: React.FC<ResumeUploadProps> = ({
    handleSubmit,
    handleFileChange,
    setSubmitted,
    error,
    response,
    submitted,
    resume,
    isLoading
  }) => {

    useEffect(() => {
      console.log(submitted);
    })


  return (
    <>
  {!submitted && (
  <Flex
    bg="gray.100"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    p="4"
    height="100vh"
    width="100vw"
  >
    <Box w="full" maxW="md" bg="white" p="8" shadow="lg" rounded="lg" mx="auto">
      <Heading as="h1" size="lg" mb="6" textAlign="center" color="gray.800">
        Upload Resume
      </Heading>
      
      {isLoading ? (
        <Flex flexDirection="column" alignItems="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text fontSize="lg" color="gray.600">
            Loading... Please wait while we process your resume.
          </Text>
        </Flex>
      ) : (
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Box w="full" textAlign="center">
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <Box
                  py="2"
                  px="4"
                  border="1px solid"
                  borderColor="gray.300"
                  rounded="lg"
                  bg="gray.100"
                  _hover={{ bg: 'gray.200' }}
                  transition="background 0.2s"
                >
                  {resume ? resume.name : "Select a PDF File"}
                  <Input
                    id="file-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    display="none"
                  />
                </Box>
              </label>
            </Box>
            {error && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              w="full"
              bg="blue.500"
              color="white"
              py="3"
              rounded="lg"
              fontWeight="semibold"
              _hover={{ bg: 'blue.600' }}
              transition="background 0.3s ease-in-out"
            >
              Submit
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  </Flex>
)}

 
  {submitted && response && (
    <Box minH="100vh" minW="100wh" bg="gray.100">
      <Box textAlign="center" bg="gray.100">
      <Button
        mt={5}
        bg="blue.500"
        color="white"
        py="2"
        px="4"
        rounded="lg"
        _hover={{ bg: 'blue.700' }}
        transition="background 0.3s"
        onClick={() => setSubmitted(false)}
      >
        Go Back
      </Button>
    </Box>
      <SubmittedAnalysis response={response} />
    </Box>
  )}

  </>
  );
};

export default ResumeUpload;
