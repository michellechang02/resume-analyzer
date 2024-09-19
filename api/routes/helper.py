def find_ideal_job(resume_text: str) -> str:
    job_keywords = {
    'HR': ['recruitment', 'human resources', 'interviewing', 'employee relations', 'onboarding', 'payroll', 'talent management'],
    'Designer': ['graphic design', 'adobe photoshop', 'adobe illustrator', 'creativity', 'typography', 'branding', 'visual design'],
    'Information-Technology': ['networking', 'database management', 'system administration', 'cloud computing', 'cybersecurity', 'it support'],
    'Teacher': ['curriculum design', 'classroom management', 'lesson planning', 'assessment', 'instructional design', 'student engagement'],
    'Advocate': ['legal research', 'litigation', 'client counseling', 'case management', 'contract law', 'negotiation'],
    'Business-Development': ['business strategy', 'sales', 'lead generation', 'market research', 'partnerships', 'client acquisition'],
    'Healthcare': ['patient care', 'medical records', 'nursing', 'diagnostics', 'clinical procedures', 'healthcare management'],
    'Fitness': ['personal training', 'exercise programs', 'nutrition', 'health coaching', 'physical fitness', 'injury prevention'],
    'Agriculture': ['crop management', 'agronomy', 'soil science', 'irrigation', 'sustainable farming', 'agricultural technology'],
    'BPO': ['call center', 'customer service', 'technical support', 'communication skills', 'time management', 'data entry'],
    'Sales': ['negotiation', 'lead generation', 'closing deals', 'account management', 'client relationship', 'sales strategies'],
    'Consultant': ['business analysis', 'problem solving', 'strategic planning', 'market research', 'client advising', 'project management'],
    'Digital-Media': ['content creation', 'video editing', 'social media marketing', 'digital marketing', 'online advertising', 'SEO'],
    'Automobile': ['automotive engineering', 'vehicle maintenance', 'mechanical systems', 'diagnostics', 'vehicle repair', 'engine tuning'],
    'Chef': ['culinary arts', 'menu planning', 'food preparation', 'recipe development', 'kitchen management', 'food safety'],
    'Finance': ['financial analysis', 'accounting', 'budgeting', 'taxation', 'financial reporting', 'investment management'],
    'Apparel': ['fashion design', 'textile knowledge', 'merchandising', 'pattern making', 'clothing production', 'fashion marketing'],
    'Engineering': ['mechanical engineering', 'electrical engineering', 'civil engineering', 'CAD', 'project management', 'problem solving'],
    'Accountant': ['accounting', 'taxation', 'financial reporting', 'auditing', 'bookkeeping', 'payroll', 'budgeting'],
    'Construction': ['project management', 'blueprint reading', 'construction management', 'safety regulations', 'structural engineering'],
    'Public-Relations': ['media relations', 'press releases', 'communication', 'crisis management', 'branding', 'event planning'],
    'Banking': ['financial services', 'loan processing', 'customer service', 'risk assessment', 'compliance', 'investment management'],
    'Arts': ['painting', 'sculpting', 'creative expression', 'art history', 'illustration', 'gallery exhibition'],
    'Aviation': ['piloting', 'flight safety', 'aircraft maintenance', 'air traffic control', 'navigation', 'flight planning']
    }

    # Track keyword matches
    job_match_counts = {job: 0 for job in job_keywords}
    
    # Check for each job category how many keywords match the resume
    for job, keywords in job_keywords.items():
        for keyword in keywords:
            if keyword in resume_text:
                job_match_counts[job] += 1
    
    # Find the job with the highest match count
    ideal_job = max(job_match_counts, key=job_match_counts.get)
    
    # If no matches found, return a default response
    if job_match_counts[ideal_job] == 0:
        # no jobs
        return ""
    
    # ideal job
    return f"{ideal_job}"