export const interviewData = {
  connectionStatus: {
    connected: true,
    latency: '24ms',
    timestamp: new Date(),
  },
  chatMessages: [
    {
      id: '1',
      type: 'ai',
      content: 'Hello! Welcome to your technical session. Today we\'ll be working on a coding challenge.',
      timestamp: new Date(Date.now() - 5 * 60000),
      isTyping: false,
    },
    {
      id: '2',
      type: 'candidate',
      content: 'Thank you! I\'m ready to start.',
      timestamp: new Date(Date.now() - 4 * 60000),
      isTyping: false,
    },
    {
      id: '3',
      type: 'ai',
      content: 'Great! Your challenge is to implement a function that finds the longest substring without repeating characters. Let\'s start coding.',
      timestamp: new Date(Date.now() - 3 * 60000),
      isTyping: false,
    },
    {
      id: '4',
      type: 'candidate',
      content: 'I\'ll need to think about this for a moment. I\'m considering using a sliding window approach.',
      timestamp: new Date(Date.now() - 2 * 60000),
      isTyping: false,
    },
    {
      id: '5',
      type: 'ai',
      content: 'Excellent thought! That\'s definitely the right approach. Go ahead and implement it.',
      timestamp: new Date(Date.now() - 60000),
      isTyping: false,
    },
    {
      id: '6',
      type: 'ai',
      content: 'I\'m analyzing your code...',
      timestamp: new Date(),
      isTyping: true,
    },
  ],
  currentCode: `function lengthOfLongestSubstring(s: string): number {
  const charIndex = new Map<string, number>();
  let maxLength = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (charIndex.has(s[i]) && charIndex.get(s[i])! >= start) {
      start = charIndex.get(s[i])! + 1;
    }
    
    charIndex.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}`,
  language: 'typescript',
  codeFiles: [
    { name: 'solution.ts', active: true },
    { name: 'test.ts', active: false },
  ],
  terminalOutput: `$ npm test
Running tests...
✓ Test Case 1: "abcabcbb" => 3
✓ Test Case 2: "bbbbb" => 1
✓ Test Case 3: "pwwkew" => 3
✓ Test Case 4: "" => 0

All tests passed! (4/4)`,
  metrics: [
    { label: 'Time Complexity', value: 'O(n)', badge: 'good' },
    { label: 'Space Complexity', value: 'O(min(m,n))', badge: 'good' },
    { label: 'Code Quality', value: '9/10', badge: 'excellent' },
    { label: 'Clarity', value: 'High', badge: 'good' },
  ],
};

// Backwards-compatible alias for session-based naming
export const sessionData = interviewData;

export const analyticsData = {
  candidateProfile: {
    name: 'Alex Johnson',
    id: 'CAND-2024-1537',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    score: 88,
  },
  skillMatrix: {
    dataStructures: 85,
    systemDesign: 78,
    codeQuality: 92,
    communication: 88,
  },
  timeline: [
    {
      time: '00:00',
      event: 'Session Room Joined',
      type: 'info',
      icon: 'log-in',
    },
    {
      time: '00:30',
      event: 'Challenge Generated: Longest Substring',
      type: 'info',
      icon: 'file-text',
    },
    {
      time: '05:22',
      event: 'First Code Submission',
      type: 'info',
      icon: 'code',
    },
    {
      time: '12:40',
      event: 'Test Case 3 Failed - Optimization Suggested',
      type: 'warning',
      icon: 'alert-circle',
    },
    {
      time: '22:15',
      event: 'Solution Refined - All Tests Passing',
      type: 'success',
      icon: 'check-circle',
    },
    {
      time: '28:45',
      event: 'Follow-up Questions on Approach',
      type: 'info',
      icon: 'message-circle',
    },
  ],
  codeReview: {
    original: `function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const sub = s.substring(i, j);
      if (new Set(sub).size === sub.length) {
        maxLen = Math.max(maxLen, sub.length);
      }
    }
  }
  return maxLen;
}`,
    optimized: `function lengthOfLongestSubstring(s: string): number {
  const charIndex = new Map<string, number>();
  let maxLength = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (charIndex.has(s[i]) && charIndex.get(s[i])! >= start) {
      start = charIndex.get(s[i])! + 1;
    }
    
    charIndex.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}`,
    insights: [
      {
        severity: 'critical',
        line: 3,
        message: 'Brute force approach - O(n³) complexity',
        suggestion: 'Use sliding window for O(n) solution',
      },
      {
        severity: 'minor',
        line: 1,
        message: 'Missing TypeScript types',
        suggestion: 'Add type annotations for better type safety',
      },
      {
        severity: 'info',
        line: 7,
        message: 'Good variable naming',
        suggestion: 'Maintain this clarity throughout',
      },
    ],
    sentiment: {
      engagement: 'High',
      clarity: 'Clear',
      problemSolving: 'Excellent',
    },
  },
};

export const upcomingInterviews = [
  {
    id: 'INT-001',
    candidateName: 'Sarah Chen',
    candidateAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    interviewType: 'Frontend',
    sessionType: 'Frontend',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    difficulty: 4,
    estimatedDuration: 60,
  },
  {
    id: 'INT-002',
    candidateName: 'Marcus Williams',
    candidateAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    interviewType: 'Backend',
    sessionType: 'Backend',
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    difficulty: 5,
    estimatedDuration: 60,
  },
  {
    id: 'INT-003',
    candidateName: 'Emma Rodriguez',
    candidateAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    interviewType: 'Full-Stack',
    sessionType: 'Full-Stack',
    scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    difficulty: 3,
    estimatedDuration: 90,
  },
  {
    id: 'INT-004',
    candidateName: 'James Park',
    candidateAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    interviewType: 'Frontend',
    sessionType: 'Frontend',
    scheduledTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    difficulty: 4,
    estimatedDuration: 60,
  },
  {
    id: 'INT-005',
    candidateName: 'Olivia Bennett',
    candidateAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    interviewType: 'Backend',
    sessionType: 'Backend',
    scheduledTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
    difficulty: 4,
    estimatedDuration: 60,
  },
];

// Backwards-compatible alias: code may refer to upcomingSessions in new model
export const upcomingSessions = upcomingInterviews;

export const activityFeed = [
  {
    id: 'ACT-001',
    type: 'interview_completed',
    title: 'Session Completed',
    description: 'Alex Johnson completed Frontend session',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'check-circle',
  },
  {
    id: 'ACT-002',
    type: 'candidate_applied',
    title: 'New Application',
    description: 'Jessica Martinez applied for Senior Engineer role',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: 'user-plus',
  },
  {
    id: 'ACT-003',
    type: 'resource_updated',
    title: 'Resource Updated',
    description: 'Full-Stack Template v2.1 released',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: 'refresh-cw',
  },
  {
    id: 'ACT-004',
    type: 'team_activity',
    title: 'Team Comment',
    description: 'Michael suggested adding system design questions',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: 'message-circle',
  },
  {
    id: 'ACT-005',
    type: 'interview_completed',
    title: 'Session Completed',
    description: 'Emma Rodriguez completed Backend session',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    icon: 'check-circle',
  },
  {
    id: 'ACT-006',
    type: 'candidate_applied',
    title: 'New Application',
    description: 'David Kim applied for Frontend Engineer role',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    icon: 'user-plus',
  },
];

export const performanceTrends = [
  { date: '1', avgScore: 72, completionRate: 85, adoptionRate: 60 },
  { date: '2', avgScore: 74, completionRate: 82, adoptionRate: 62 },
  { date: '3', avgScore: 71, completionRate: 80, adoptionRate: 65 },
  { date: '4', avgScore: 75, completionRate: 88, adoptionRate: 68 },
  { date: '5', avgScore: 78, completionRate: 90, adoptionRate: 70 },
  { date: '6', avgScore: 76, completionRate: 87, adoptionRate: 72 },
  { date: '7', avgScore: 79, completionRate: 92, adoptionRate: 75 },
  { date: '8', avgScore: 81, completionRate: 94, adoptionRate: 78 },
  { date: '9', avgScore: 80, completionRate: 91, adoptionRate: 80 },
  { date: '10', avgScore: 82, completionRate: 95, adoptionRate: 82 },
];

export const resourceTemplates = [
  {
    id: 'TMP-001',
    title: 'Full-Stack Mastery',
    description: 'Complete session covering frontend, backend, and database design',
    languages: ['TypeScript', 'Node.js', 'React'],
    rating: 4.8,
    difficulty: 'Hard',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=fullstack',
  },
  {
    id: 'TMP-002',
    title: 'React Advanced',
    description: 'Deep dive into React hooks, performance, and architecture patterns',
    languages: ['TypeScript', 'React', 'Next.js'],
    rating: 4.6,
    difficulty: 'Medium',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=react',
  },
  {
    id: 'TMP-003',
    title: 'System Design Pro',
    description: 'Session covering scalability, databases, and architecture decisions',
    languages: ['Node.js', 'PostgreSQL', 'Redis'],
    rating: 4.9,
    difficulty: 'Hard',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=system',
  },
  {
    id: 'TMP-004',
    title: 'Data Structures & Algorithms',
    description: 'Classic coding session with algorithm problems and optimization',
    languages: ['Python', 'JavaScript', 'Java'],
    rating: 4.7,
    difficulty: 'Medium',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=dsa',
  },
  {
    id: 'TMP-005',
    title: 'Backend Fundamentals',
    description: 'REST APIs, databases, authentication, and server architecture',
    languages: ['Node.js', 'Express', 'PostgreSQL'],
    rating: 4.5,
    difficulty: 'Medium',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=backend',
  },
  {
    id: 'TMP-006',
    title: 'DevOps & Infrastructure',
    description: 'Cloud platforms, containerization, CI/CD, and infrastructure as code',
    languages: ['Docker', 'Kubernetes', 'AWS'],
    rating: 4.4,
    difficulty: 'Hard',
    thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=devops',
  },
];

export const guides = [
  {
    id: 'GUIDE-001',
    title: 'Behavioral Session Best Practices',
    author: 'People Ops',
    description: 'Best practices for conducting fair and consistent behavioral sessions',
    readTime: 8,
    views: 1242,
  },
  {
    id: 'GUIDE-002',
    title: 'Technical Assessment Framework',
    author: 'Engineering',
    description: 'A framework for designing and scoring technical sessions',
    readTime: 12,
    views: 856,
  },
  {
    id: 'GUIDE-003',
    title: 'Onboarding New Interviewers',
    author: 'Learning & Development',
    description: 'Complete guide for training new technical interviewers',
    readTime: 15,
    views: 623,
  },
  {
    id: 'GUIDE-004',
    title: 'Avoiding Common Bias in Sessions',
    author: 'Diversity & Inclusion',
    description: 'Research-backed strategies for fair and inclusive sessions',
    readTime: 10,
    views: 1856,
  },
];

// Backwards-compatible alias for guides referencing sessions
export const sessionGuides = guides;

export const codeSnippets = [
  {
    id: 'SNIPPET-001',
    language: 'TypeScript',
    title: 'Binary Search Implementation',
    code: `function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    views: 342,
  },
  {
    id: 'SNIPPET-002',
    language: 'Python',
    title: 'Merge Sort Algorithm',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
    views: 298,
  },
  {
    id: 'SNIPPET-003',
    language: 'JavaScript',
    title: 'Promise.all Implementation',
    code: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('Input must be an array'));
    }
    if (promises.length === 0) {
      resolve([]);
    }
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (result) => {
          results[index] = result;
          if (++completed === promises.length) {
            resolve(results);
          }
        },
        (error) => reject(error)
      );
    });
  });
}`,
    views: 567,
  },
];

export const evaluationHistory = [
  {
    id: 'EVAL-001',
    candidate: { name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    interviewId: 'INT-2024-001',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    type: 'Frontend',
    duration: 58,
    score: 88,
    status: 'Completed',
    interviewer: 'Sarah Chen',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-002',
    candidate: { name: 'Emma Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    interviewId: 'INT-2024-002',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: 'Backend',
    duration: 62,
    score: 92,
    status: 'Completed',
    interviewer: 'Michael Park',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-003',
    candidate: { name: 'James Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    interviewId: 'INT-2024-003',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    type: 'Full-Stack',
    duration: 89,
    score: 76,
    status: 'Completed',
    interviewer: 'AI',
    outcome: 'No Decision',
  },
  {
    id: 'EVAL-004',
    candidate: { name: 'Jessica Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
    interviewId: 'INT-2024-004',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    type: 'Frontend',
    duration: 45,
    score: 62,
    status: 'Completed',
    interviewer: 'Sarah Chen',
    outcome: 'Failed',
  },
  {
    id: 'EVAL-005',
    candidate: { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    interviewId: 'INT-2024-005',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    type: 'Backend',
    duration: 67,
    score: 85,
    status: 'Completed',
    interviewer: 'Michael Park',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-006',
    candidate: { name: 'Lisa Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
    interviewId: 'INT-2024-006',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    type: 'System Design',
    duration: 75,
    score: 91,
    status: 'Completed',
    interviewer: 'AI',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-007',
    candidate: { name: 'Tom Anderson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
    interviewId: 'INT-2024-007',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: 'Frontend',
    duration: 60,
    score: 78,
    status: 'Completed',
    interviewer: 'Sarah Chen',
    outcome: 'No Decision',
  },
  {
    id: 'EVAL-008',
    candidate: { name: 'Rachel Green', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel' },
    interviewId: 'INT-2024-008',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    type: 'Backend',
    duration: 71,
    score: 87,
    status: 'Completed',
    interviewer: 'Michael Park',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-009',
    candidate: { name: 'Christopher Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
    interviewId: 'INT-2024-009',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    type: 'Full-Stack',
    duration: 95,
    score: 94,
    status: 'Completed',
    interviewer: 'AI',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-010',
    candidate: { name: 'Nicole Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicole' },
    interviewId: 'INT-2024-010',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    type: 'Frontend',
    duration: 52,
    score: 68,
    status: 'Completed',
    interviewer: 'Sarah Chen',
    outcome: 'Failed',
  },
  {
    id: 'EVAL-011',
    candidate: { name: 'Kevin Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin' },
    interviewId: 'INT-2024-011',
    date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    type: 'Backend',
    duration: 64,
    score: 81,
    status: 'Completed',
    interviewer: 'Michael Park',
    outcome: 'Passed',
  },
  {
    id: 'EVAL-012',
    candidate: { name: 'Stephanie White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steph' },
    interviewId: 'INT-2024-012',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    type: 'System Design',
    duration: 73,
    score: 89,
    status: 'Completed',
    interviewer: 'AI',
    outcome: 'Passed',
  },
];
