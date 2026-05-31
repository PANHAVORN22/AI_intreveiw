# InterviewAI Platform - Complete User Guide

## 📋 Table of Contents
1. [Platform Overview](#platform-overview)
2. [Authentication Workflow](#authentication-workflow)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Step-by-Step User Journey](#step-by-step-user-journey)
5. [How InterviewAI Helps](#how-interviewai-helps)
6. [Feature Breakdown](#feature-breakdown)
7. [Best Practices](#best-practices)

---

## Platform Overview

**InterviewAI** is an AI-powered technical session platform designed to revolutionize how engineering teams and HR professionals conduct technical assessments. The platform combines:

-- **Live Session Environment**: Real-time coding sessions with AI-powered feedback
- **Code Analysis**: Automatic evaluation of code quality, efficiency, and best practices
- **Analytics Dashboard**: Comprehensive candidate performance metrics
-- **Resource Library**: Pre-built session templates, guides, and code snippets
 - **Evaluation History**: Track and manage all past sessions and candidate assessments

### Key Benefits:
✅ **Standardized Evaluation**: Consistent session experience for all candidates
✅ **Real-Time Feedback**: AI provides instant insights during the session
✅ **Data-Driven Decisions**: Comprehensive analytics to help with hiring decisions
✅ **Time Efficient**: Reduces session preparation time significantly
✅ **Scalable**: Support unlimited sessions and candidate tracking

---

## Authentication Workflow

### Sign Up Flow (New Users)
```
User lands on platform
         ↓
Clicks "Sign Up" / "Get Started"
         ↓
Fills registration form:
  - Full Name
  - Email Address
  - Password (with strength indicator)
  - Confirm Password
  - Accept Terms & Conditions
         ↓
Clicks "Create Account"
         ↓
Email verification sent
         ↓
User clicks verification link in email
         ↓
Account activated → Redirects to onboarding
         ↓
Completes profile setup:
  - Avatar upload
  - Job title
  - Company name
  - Department
         ↓
Grants access to dashboard
         ↓
✅ Account Setup Complete!
```

**Signup Page URL**: `https://yourapp.com/register`

### Login Flow (Existing Users)
```
User visits login page
         ↓
Enters email address
         ↓
Enters password
         ↓
[Optional] Clicks "Remember me" checkbox
         ↓
Clicks "Sign In"
         ↓
System validates credentials
         ↓
Creates session / Auth token
         ↓
Redirects to dashboard
         ↓
✅ User Logged In!
```

**Login Page URL**: `https://yourapp.com/login`

### Forgot Password Flow
```
User clicks "Forgot password?" on login
         ↓
Enters email address
         ↓
System sends password reset email
         ↓
User clicks reset link in email
         ↓
Sets new password
         ↓
Password updated
         ↓
Redirects to login with success message
         ↓
✅ Password Reset Complete!
```

---

## User Roles & Permissions

### 1. **Interviewer** (Engineering Manager / Senior Engineer)
- **Responsibilities:**
- Conduct technical sessions
- Ask follow-up questions
- Evaluate candidate performance
- Review code submissions
- Provide feedback

**Access:**
- Create and manage sessions
- View live code editor and terminal
- Access analytics dashboards
- Create custom session templates
- Manage candidate database

### 2. **HR Professional** (Recruiter / HR Manager)
**Responsibilities:**
- Schedule sessions
- Track candidate pipeline
- Generate session reports
- Manage team settings
- Monitor hiring metrics

**Access:**
- View all sessions and evaluations
- Filter and search candidates
- Export evaluation data
- Access performance trends
- View team analytics

### 3. **Candidate** (Applicant)
**Responsibilities:**
- Participate in sessions
- Solve coding challenges
- Provide written responses
- Accept session invitations

**Access:**
- View session schedule
- Access live session room
- Submit code solutions
- View past feedback (if enabled)

### 4. **Admin** (Platform Administrator)
**Responsibilities:**
- Manage user accounts
- Configure system settings
- Monitor platform usage
- Manage team billing

**Access:**
- Full platform access
- User management
- System settings
- Billing & subscription

---

## Step-by-Step User Journey

### 👤 User Journey #1: Interviewer Conducting a Session

#### Phase 1: Preparation (Day Before)
**Step 1**: Log into dashboard
-- URL: `https://yourapp.com/dashboard`
-- Dashboard shows upcoming sessions

**Step 2**: View session details
- Click on session card showing candidate name, time, and difficulty
- Review candidate background and previous sessions

**Step 3**: Prepare session
- Visit `/docs` to review session best practices
- Check `/resources/library` for relevant session templates
- Browse `/resources/code-library` for code examples

#### Phase 2: Live Session (Day Of)
- **Step 4**: Start the session
- Navigate to `/interview/room` 5 minutes before scheduled time
- See WebSocket connection status at the top
- Room shows: Chat, Code Editor, Terminal, and Real-time Metrics

**Step 5**: Conduct the session (Duration: 45-60 minutes)
```
Timeline of the session:
├─ 0:00-5:00   → Introductions and question overview
├─ 5:00-50:00  → Candidate solves coding challenges
│   ├─ Chat pane: AI and interviewer communicate with candidate
│   ├─ Code pane: Candidate writes and modifies code
│   └─ Terminal: Real-time test execution and results
├─ 50:00-60:00 → Follow-up questions and deep dive
└─ 60:00       → Session concludes
```

- **Step 6**: Use session room features:
- **Chat**: Ask clarifying questions, provide hints
- **Code Editor**: See live code with syntax highlighting
- **Terminal**: Review test output and execution results
- **Metrics Tags**: Monitor real-time feedback (Engagement, Clarity, Problem-Solving)

- #### Phase 3: Post-Session (Same Day)
- **Step 7**: Generate report
- - Session ends and automatically generates analytics report
- View `/analytics/dashboard` for detailed candidate evaluation

**Step 8**: Access evaluation data
- Navigate to `/history/evaluations`
- View all session records and scores
- Export data for HR review

**Step 9**: Update profile if needed
- Click user avatar in top-right
- Click "Profile" to update personal information
- Save changes

---

### 🎯 User Journey #2: HR Professional Managing Candidates

#### Phase 1: Dashboard Overview
**Step 1**: Log in and view dashboard
-- See statistics: total sessions, average score, completion rate, active candidates
-- View upcoming sessions for the week
- Check recent activity from team

#### Phase 2: Candidate Management
**Step 2**: View all candidates
- Navigate to `/candidates`
- See list of all candidates with:
  - Avatar and name
  - Email and contact info
   - Session count
   - Average score (if evaluated)
   - Status (Active, Evaluated, Inactive)

**Step 3**: Filter and search
- Search by candidate name or email
-- Filter by status (Active, Evaluated, Inactive)
- Filter by department or role

**Step 4**: Add new candidate
- Click "+ Add Candidate" button
- Fill in:
  - Full name
  - Email address
  - Phone number
  - Position applied for
  - Resume link
- Click "Create Candidate"

#### Phase 3: Session History & Reports
**Step 5**: View evaluation history
- Navigate to `/history/evaluations`
   - See all past sessions with:
  - Candidate name and avatar
   - Session date and type
  - Duration and score
   - Interviewer name
  - Outcome (Passed/Failed/No Decision)

**Step 6**: Filter evaluations
- Date range picker: Select evaluation period
- Status filter: Active, Completed, Cancelled
- Difficulty filter: Easy, Medium, Hard
- Outcome filter: Passed, Failed, No Decision

**Step 7**: Export data
- Click "Export as CSV" button
- Download spreadsheet with all evaluation data
- Use for reports or analysis

#### Phase 4: Analytics & Insights
**Step 8**: View performance trends
- On dashboard, see 30-day performance chart showing:
  - Average candidate scores
   - Session completion rates
  - Platform adoption growth

**Step 9**: Generate reports
- Navigate to `/analytics/dashboard`
- View individual candidate skill assessments
   - Review session timeline with key events
- Access code review with quality feedback

---

### 💻 User Journey #3: Setting Up Personal Preferences

#### Step 1: Access profile
- Click user avatar in top-right corner
- Click "Profile" from dropdown menu
- URL: `https://yourapp.com/profile`

#### Step 2: Edit profile information
- **Avatar Section**:
  - Click avatar to change
  - Upload new profile picture
  - Crop and confirm

- **Personal Information**:
  - Name, email (usually read-only)
  - Job title (e.g., "Engineering Manager")
  - Company
  - Phone number
  - Location
  - Bio

- **Account Actions**:
  - Change password
  - Enable 2-factor authentication
  - Logout from all devices

#### Step 3: Configure settings
- Click user avatar → Select "Settings"
- URL: `https://yourapp.com/settings`

**General Tab**:
- Company name
- Timezone selection
- Default language

**Notifications Tab**:
- Email notifications toggle
- Session reminders
- Weekly summary reports
- New feature announcements

**Privacy & Security Tab**:
- Public profile visibility
- 2FA setup
- Password change
- Active sessions management

**API Keys Tab** (for developers):
- Create new API key
- View existing keys
- Regenerate or revoke access

---

## How InterviewAI Helps

### 🎯 For Engineering Managers / Interviewers

1. **Consistent Evaluation**
   - Same standards for all candidates
   - AI-powered evaluation removes bias
   - Historical data for comparison

2. **Time Savings**
   - Pre-built session templates reduce preparation
   - Code review automation
   - Detailed reports save writing time

3. **Better Decision Making**
   - Real-time metrics during session
   - Comprehensive skill assessments
   - Historical performance data

4. **Team Collaboration**
   - Shared candidate database
   - Team analytics and insights
   - Documentation and best practices

### 📊 For HR Professionals

1. **Pipeline Management**
   - Centralized candidate database
   - Searchable and filterable records
   - Status tracking at a glance

2. **Data-Driven Hiring**
   - Standardized scoring system
   - Performance trends and patterns
   - Export data for analysis

3. **Compliance & Documentation**
   - Complete session records
   - Timestamped evaluations
   - Audit trail for hiring decisions

4. **Cost Efficiency**
   - Reduced time-to-hire
   - Lower session cancellation rates
   - Improved candidate experience

### 👨‍💻 For Candidates

1. **Fair Evaluation**
   - Consistent session experience
   - Clear evaluation criteria
   - Real-time feedback

2. **Better Experience**
   - No waiting for feedback
   - Professional environment
   - Recorded results for reference

3. **Learning Opportunity**
   - AI-powered code suggestions
   - Best practices highlighted
   - Performance insights

---

## Feature Breakdown

### Dashboard (`/dashboard`)
**What it shows:**
 - Total sessions conducted
- Average candidate score
- Session completion rate
- Number of active candidates
 - Upcoming session schedule (next 5)
- Recent activity feed (last 10 events)
- 30-day performance trend chart

**When to use:**
- First thing in the morning to check schedule
- Weekly team review meetings
- Management reporting

---

### Candidates (`/candidates`)
**What it does:**
- List all candidates in the system
- Search by name, email, or phone
- Filter by status or department
 - View session history per candidate
- Add new candidates

**When to use:**
- Recruiting and sourcing
- Candidate outreach
- Reference checks
- Team onboarding

---

### Session Room (`/interview/room`)
**What it includes:**
- Live chat with AI and interviewer
- Code editor with syntax highlighting
- Terminal for test execution
- Real-time metrics and feedback
- WebSocket connection status

**When to use:**
- During scheduled sessions
- Approximately 45-60 minutes per session
- One per candidate assessment

---

### Evaluation History (`/history/evaluations`)
**What it provides:**
- Complete list of all sessions
- Candidate name and session ID
- Date, type, duration, score
- Interviewer name
- Session outcome
- Export functionality

**When to use:**
- Monthly hiring reports
- Performance analysis
- Candidate reference
- Team analytics

---

### Analytics Dashboard (`/analytics/dashboard`)
**What it shows:**
- Candidate profile with overall score
- Skill matrix (radar chart of competencies)
- Session timeline with key events
- Code review with before/after comparison
- AI-generated insights

**When to use:**
- Post-session evaluation
- Detailed candidate assessment
- Decision-making
- Feedback to candidate

---

### Resource Library (`/resources/library`)
**What it contains:**
- Session templates (6 categories)
- Best practice guides (4 guides)
- Code snippets (3 snippets)
- Filter by difficulty and language
- Search functionality

**When to use:**
- Session preparation
- Onboarding new interviewers
- Creating custom templates
- Learning best practices

---

### Code Library (`/resources/code-library`)
**What it features:**
- Code snippet library with syntax highlighting
- Language analytics (distribution, popularity)
- Copy-to-clipboard functionality
- Recent submissions with pass/fail status
- Language-specific filtering

**When to use:**
- Reviewing candidate code patterns
- Finding reference implementations
- Code snippet sharing
- Quality benchmarking

---

### Documentation (`/docs`)
**What it includes:**
- Getting Started guide
- Session Templates guide
- API Reference documentation
- FAQs and troubleshooting
- Search across all docs

**When to use:**
- Platform onboarding
- New interviewer training
- Technical integration
- Troubleshooting issues

---

### Profile (`/profile`)
**What you can manage:**
- Avatar and basic info
- Name, email, title, company
- Phone, location, bio
- Password change
- 2-factor authentication
- Account preferences

**When to use:**
- First-time setup
- Updating contact information
- Security changes
- Preference adjustments

---

### Settings (`/settings`)
**What you can configure:**
- General preferences (timezone, language)
- Notification settings
- Privacy and security options
- API key management
- Team member permissions

**When to use:**
- Account setup
- Changing preferences
- Team configuration
- Security hardening

---

## Best Practices

### 📋 For Interviewers

1. **Before the Session:**
   - Review candidate resume (48 hours before)
   - Check previous session results
   - Prepare problem statement in advance
   - Do a tech check 10 minutes early

2. **During the Session:**
   - Start with small-talk (5 min) to ease candidate
   - Clearly explain the problem
   - Let candidate think before coding
   - Ask clarifying questions about approach
   - Avoid giving answers, guide with hints
   - Monitor real-time metrics for engagement

3. **After the Session:**
   - Complete evaluation within 1 hour
   - Reference metrics from session
   - Provide specific feedback examples
   - Document code quality observations
   - Submit assessment in system same day

### 📊 For HR Professionals

1. **Candidate Management:**
   - Update candidate status after each session
   - Keep contact information current
   - Document hiring stage progress
   - Schedule sessions at least 3 days out
   - Send calendar invitations with platform link

2. **Data Analysis:**
   - Review trends monthly
   - Compare evaluators for consistency
   - Identify skill gaps across team
   - Track time-to-hire metrics
   - Export for executive reporting

3. **Team Organization:**
   - Set clear notification preferences
   - Establish evaluation standards
   - Document decision criteria
   - Regular calibration meetings
   - Share best practices with team

### 👨‍💻 For Candidates

1. **Session Preparation:**
   - Confirm session time and date
   - Test internet connection beforehand
   - Use a quiet environment
   - Have pen and paper for notes
   - Arrive 5 minutes early

2. **During Session:**
   - Talk through your thought process
   - Ask for clarification if confused
   - Write clean, readable code
   - Test your solution thoroughly
   - Explain your optimization approach

3. **Post-Session:**
   - Thank the interviewer
   - Ask about next steps
   - Request feedback if available
   - Review provided code analysis
   - Prepare for follow-up conversations

---

## Support & Resources

### Need Help?
- 📧 Email: support@interviewai.com
- 💬 Chat: Available in app on `/docs` page
- 📚 Documentation: `https://yourapp.com/docs`
- 🎓 Tutorials: Video guides in getting started

### Common Issues

**Q: I forgot my password**
A: Click "Forgot password?" on login page, enter email, follow reset link

**Q: How do I add team members?**
A: Go to Settings → Team members → Invite users

**Q: Can I export session data?**
A: Yes! On `/history/evaluations` page, click "Export as CSV"

**Q: How long do sessions usually take?**
A: Standard sessions are 45-60 minutes total

**Q: Can I reschedule a session?**
A: Yes, email the candidate with new time/link from dashboard

---

## Summary

InterviewAI transforms technical hiring by providing:
-- **Standardized sessions** through templates and consistent evaluation
- **Real-time insights** with AI feedback during live coding
- **Data-driven decisions** through comprehensive analytics
- **Time efficiency** with automated reports and metrics
- **Better candidate experience** with professional, fair assessments

Start with the dashboard, navigate to candidate management, schedule sessions, and use analytics to make hiring decisions. All features integrate seamlessly to streamline your technical recruitment process.

**Happy sessions! 🚀**
