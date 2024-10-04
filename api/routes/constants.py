# constants.py

# A set of common stopwords to exclude, including resume-specific stopwords
STOPWORDS = set([
    "with", "from", "this", "that", "have", "and", "for", "the", "a", "an",
    "in", "on", "at", "by", "of", "is", "to", "it", "as", "are", "was", "were",
    "or", "be", "can", "which", "their", "has", "will", "but", "not", "than",
    "if", "also", "more", "many", "some", "i", "you", "he", "she", "we", "they",
    "me", "him", "her", "them", "my", "your", "his", "its", "our", "who", "whom",
    "whose", "what", "when", "where", "why", "how", "do", "does", "did", "done",
    "being", "been", "would", "should", "could", "shall", "might", "must", "may",
    "about", "after", "before", "again", "against", "all", "any", "because", "between",
    "both", "each", "few", "over", "under", "out", "up", "down", "then", "there", 
    "once", "such", "very", "like", "so", "no", "nor", "too", "just", "only", 
    "now", "same", "through", "during", "until", "while", "here", "where", "why",
    "how", "above", "below", "under", "into", "upon", "these", "those", "off", 
    "own", "does", "doing", "than", "am", "shall", "anyone", "anything", "anywhere",
    "everyone", "everything", "everywhere", "someone", "something", "somewhere",
    "nothing", "none", "neither", "either", "several", "others", "another", 
    "without", "within", "because", "toward", "against",
    
    # Resume-specific stopwords
    "professional", "experience", "responsibilities", "role", "worked", "work",
    "working", "team", "member", "members", "company", "organization", "years", 
    "year", "month", "months", "skills", "ability", "proven", "successful",
    "developed", "developing", "participated", "managed", "manage", "led", "lead",
    "leading", "projects", "project", "task", "tasks", "duties", "assigned",
    "collaborated", "collaborate", "result", "results", "achieved", "achieve",
    "meeting", "met", "exceeded", "accomplished", "accomplish", "knowledge", 
    "strong", "excellent", "good", "effective", "efficient", "goal", "goals",
    "objectives", "objective", "communication", "skills", "interpersonal", 
    "detail", "oriented", "motivated", "highly", "driven", "focused", 
    "customer", "clients", "client", "stakeholders", "stakeholder", 
    "utilized", "utilize", "using", "use", "including", "include", "provided",
    "provide", "support", "supported", "responsible", "results-driven",
    "team-player", "fast-paced", "environment", "proficient", "extensive",
    "background", "field", "industry", "demonstrated", "demonstrate", 
    "solutions", "solution", "improve", "improved", "ensured", "ensure",
    "assisted", "assist", "built", "build", "handled", "handle", "organized",
    "organization", "coordinated", "coordinate", "detail-oriented", 
    "enthusiastic", "dedicated", "commitment", "committed", "goal-oriented",
    "passionate", "innovative", "results-oriented"
])

# Common job-related terms or categories to extract
COMMON_KEYWORDS = set([
    # Job Titles
    "developer", "engineer", "designer", "manager", "analyst", "consultant",
    "administrator", "architect", "specialist", "coordinator", "strategist",
    "director", "technician", "scientist", "intern", "supervisor", "executive",
    "operator", "programmer", "product", "owner", "business", "system", "tester",

    # Software and Hardware
    "software", "hardware", "web", "data", "cloud", "system", "platform",
    "network", "server", "security", "infrastructure", "embedded", "database",

    # Fields and Domains
    "science", "machine", "learning", "analytics", "automation", "artificial",
    "intelligence", "blockchain", "fintech", "biotech", "e-commerce", "education",
    "healthcare", "finance", "consulting", "manufacturing", "supply", "chain",
    "operations", "sales", "marketing", "research", "development",

    # Programming Languages
    "python", "java", "javascript", "typescript", "html", "css", "sql", 
    "c", "c++", "c#", "php", "ruby", "go", "swift", "kotlin", "r", "matlab",
    "bash", "shell", "perl", "dart", "scala",

    # Web Technologies and Frameworks
    "react", "node", "express", "angular", "vue", "django", "flask", "rails",
    "spring", "laravel", "bootstrap", "jquery", "next.js", "nuxt.js",
    "graphql", "rest", "soap",

    # Methodologies and Workflows
    "agile", "scrum", "kanban", "devops", "waterfall", "lean", "six", "sigma",
    "ci/cd", "continuous", "integration", "deployment", "tdd", "bdd", "pair", "programming",

    # Cloud Technologies
    "aws", "azure", "gcp", "google", "cloud", "lambda", "s3", "ec2", "kubernetes",
    "docker", "terraform", "cloudformation", "serverless",

    # Tools and Software
    "jira", "trello", "slack", "confluence", "asana", "git", "github", "gitlab",
    "bitbucket", "jenkins", "ansible", "puppet", "chef", "nagios", "splunk",
    "datadog", "newrelic", "salesforce", "hubspot", "sap", "powerbi", "tableau",
    "excel", "sql", "nosql", "mongodb", "redis", "firebase", "elasticsearch",
    "hadoop", "spark", "airflow", "fivetran", "looker",

    # UI/UX Design and Tools
    "ui", "ux", "user", "interface", "user", "experience", "figma", "adobe",
    "xd", "sketch", "invision", "wireframe", "prototype", "design", "user",
    "journey", "user", "research",

    # Databases
    "mysql", "postgresql", "oracle", "mongodb", "mariadb", "sqlite", "cassandra",
    "db2", "redis", "dynamodb", "firebase", "redshift", "snowflake", "bigquery",

    # Machine Learning and Data Science
    "ai", "artificial", "intelligence", "machine", "learning", "deep", "learning",
    "neural", "networks", "tensorflow", "keras", "pytorch", "scikit-learn",
    "pandas", "numpy", "statistics", "clustering", "regression", "classification",
    "nlp", "natural", "language", "processing", "reinforcement", "learning",
    "unsupervised", "supervised",

    # Testing and Quality Assurance
    "testing", "unit", "tests", "integration", "testing", "qa", "quality",
    "assurance", "selenium", "cypress", "jest", "mocha", "chai", "junit",
    "postman", "automation", "manual",

    # Soft Skills
    "leadership", "communication", "teamwork", "problem-solving", "adaptability",
    "creativity", "initiative", "collaboration", "project", "management",
    "time", "management", "critical", "thinking", "negotiation", "presentation",

    # Certifications
    "certified", "certification", "aws", "azure", "gcp", "pmp", "scrum",
    "csm", "cissp", "ccna", "comptia", "security+", "itil",

    # Miscellaneous Keywords
    "sdlc", "etl", "pipelines", "business", "analysis", "crm", "erp",
    "middleware", "authentication", "authorization", "oauth", "jwt", "api",
    "microservices", "soa", "version", "control", "virtualization", "hypervisor",
    "vpn", "firewall", "proxy"
])
