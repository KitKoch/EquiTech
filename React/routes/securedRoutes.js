import { lazy } from "react";
const PageNotFound = lazy(() => import("../components/errors/Error404"));
const TeamsList = lazy(() => import("../components/teams/TeamsList"));
const TeamsForm = lazy(() => import("../components/teams/TeamsForm"));
const UserSkillsForm = lazy(() =>
  import("../components/userskills/UserSkillsForm")
);
const UserSkillsList = lazy(() =>
  import("../components/userskills/UserSkillsList")
);
const JobSkills = lazy(() => import("../components/jobskills/JobSkillsMain"));
const NewsletterSubscriptionsDashboard = lazy(() =>
  import("../pages/dashboards/newsletter/SubscriptionsTable.jsx")
);
const SkillForm = lazy(() => import("../components/skills/SkillForm"));
const SkillList = lazy(() => import("../components/skills/SkillList"));
const Appointments = lazy(() =>
  import("../components/appointments/AppointmentsList")
);
const AppointmentForm = lazy(() =>
  import("../components/appointments/AppointmentForm")
);
const PersonalValueRank = lazy(() =>
  import("../components/personalvaluerank/PersonalValueRanking")
);
const RelatedPersonalValues = lazy(() =>
  import("../components/relatedpersonalvalues/RelatedPersonalValues")
);
const Surveys = lazy(() => import("../components/surveys/Survey"));
const Jobs = lazy(() => import("../components/jobs/Jobs"));
const CompensationPackageForm = lazy(() =>
  import("../components/compensations/CompensationPackageForm")
);
const CompensationElementForm = lazy(() =>
  import("../components/compensations/CompensationElementForm")
);
const CompensationsDashboard = lazy(() =>
  import("../components/compensations/CompensationsDashboard")
);
const CompensationConfiguration = lazy(() =>
  import("../components/compensations/CompensationConfiguration")
);
const AnalyticsDashboard = lazy(() =>
  import("../components/siteanalytics/AnalyticsDashboard")
);
const UserAdmin = lazy(() => import("../components/users/UserAdmin"));
const AddUserEducation = lazy(() =>
  import("../components/users/userseducationlevels/AddUserEducation")
);
const UsersEducationList = lazy(() =>
  import("../components/testlist/UserEducationList")
);
const UserDemographics = lazy(() =>
  import("../components/users/UserDemographics")
);
const EducationRequirements = lazy(() =>
  import("../components/education/EducationRequirements")
);
const NewJobPosting = lazy(() => import("../components/jobs/NewJobPosting"));
const JobsPage = lazy(() => import("../components/jobs/JobsPage"));
const UsersAdmin = lazy(() => import("../components/users/UserAdmin"));
const FaqForm = lazy(() => import("../components/faq/FaqForm"));

const JobLinks = lazy(() => import("../components/joblinks/JobLinks"));

const ShareStoriesForm = lazy(() =>
  import("../components/sharestories/ShareStoriesForm")
);

// dashboard

const AddSchool = lazy(() => import("../components/schools/AddSchool"));
const PagedSchools = lazy(() => import("../components/schools/PagedSchools"));
const FileManagerMain = lazy(() =>
  import("../components/filemanager/FileManagerMain")
);
const PdfWizard = lazy(() => import("../components/pdf/PdfWizard"));
const SiteRefChart = lazy(() =>
  import("../components/sitereferences/SiteReferenceChart")
);
const ResumeWizard = lazy(() => import("../components/resumes/ResumesWizard"));
const OrgMembersList = lazy(() =>
  import("../components/organizationmembers/OrgMembersList")
);
const OrgMemberInviteForm = lazy(() =>
  import("../components/organizationmembers/OrgMemberInviteForm")
);
const OrganizationsList = lazy(() =>
  import("../components/organizations/OrganizationsList")
);
const OrganizationsView = lazy(() =>
  import("../components/organizations/OrganizationsView")
);
const OrgFormToolPage = lazy(() =>
  import("../components/organizations/OrgFormToolPage")
);
const OrganizationsForm = lazy(() =>
  import("../components/organizations/OrganizationsForm")
);
const OrganizationDash = lazy(() =>
  import("../components/organizations/homedashboard/HomeDash")
);
const AddLocationsForm = lazy(() =>
  import("../components/organizations/AddLocationsForm")
);
const CharitableFundForm = lazy(() =>
  import("../components/donations/CharitableFundForm")
);
const CharitableFundList = lazy(() =>
  import("../components/donations/CharitableFundList")
);
const Venues = lazy(() => import("../components/venues/Venue"));
const VenuesForm = lazy(() => import("../components/venues/VenueForm"));
const VenuesAdminView = lazy(() =>
  import("../components/venues/VenuesAdminView")
);
const Blog = lazy(() => import("../components/blogs/Blog"));
const PayPalDonate = lazy(() => import("../components/donations/PayPalDonate"));
const UserSettings = lazy(() =>
  import("../components/usersettings/UserSettings")
);
const CandidateProfile = lazy(() =>
  import("../pages/dashboards/main/candidate/Candidate")
);
const LicensesList = lazy(() => import("../components/licenses/LicensesList"));
const LicenseForm = lazy(() => import("../components/licenses/LicenseForm"));
const Chat = lazy(() => import("../pages/chat/ChatPage"));
const SurveyBuilder = lazy(() => import("../components/surveys/SurveyBuilder"));
const Goals = lazy(() => import("../components/goals/Goals"));
const GoalForm = lazy(() => import("../components/goals/GoalForm"));
const ExternalLinkForm = lazy(() =>
  import("../components/externallinks/ExternalLinkForm")
);
const ExternalLinkList = lazy(() =>
  import("../components/externallinks/ExternalLinkList")
);
const CandidateLocationsForm = lazy(() =>
  import("../components/candidatelocations/CandidateLocationsForm.jsx")
);
const CandidateLocations = lazy(() =>
  import("../components/candidatelocations/CandidateLocations.jsx")
);

const SurveyAnswers = lazy(() =>
  import("../pages/dashboards/surveyanalytics/SurveyAnswers")
);

const ForumsForm = lazy(() => import("../components/forums/ForumsForm"));
const chatRoutes = [
  {
    path: "/dashboard/chat",
    name: "chat",
    exact: true,
    element: Chat,
    roles: ["Candidate", "SysAdmin", "User", "HiringAdmin"],
    isAnonymous: false,
  },
];
const Videochat = lazy(() => import("../components/videochat/Videochat"));
const AddNewsletterForm = lazy(() =>
  import("../components/newsletters/AddNewsletterForm")
);

const externallinkRoutes = [
  {
    path: "/externallinks/add",
    name: "External Links",
    element: ExternalLinkForm,
    roles: ["Candidate", "HiringAdmin", "OrgAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/externallinks/:id/edit",
    name: "External Links",
    element: ExternalLinkForm,
    roles: ["Candidate", "HiringAdmin", "OrgAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/externallinks",
    name: "External Links List",
    element: ExternalLinkList,
    roles: ["Candidate", "HiringAdmin", "OrgAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
import MultipleLocations from "../components/location/MultipleLocations";

const LocationForm = lazy(() => import("../components/location/LocationForm"));

const CommentForm = lazy(() => import("../components/comments/CommentForm"));
const CommentsExample = lazy(() =>
  import("../components/comments/CommentsExample")
);

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/admin",
        name: "Admin",
        header: "Navigation",
        children: [
          {
            path: "/dashboard/admin/users",
            name: "User Admin",
            element: UsersAdmin,
            roles: ["SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
        ],
      },
      {
        path: "/dashboard/organization",
        name: "Organization Home Dashboard",
        exact: true,
        element: OrganizationDash,
        roles: ["OrgAdmin"],
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboard,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/users",
        name: "User Admin",
        element: UserAdmin,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/newsletter/subscriptions",
        name: "Newslettersubscriptions",
        element: NewsletterSubscriptionsDashboard,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/videochat",
        name: "Videochat",
        exact: true,
        element: Videochat,
        roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
        isAnonymous: false,
      },
      {
        path: "/dashboard/surveys/answered",
        name: "SurveyAnswers",
        exact: true,
        element: SurveyAnswers,
        roles: ["HiringAdmin", "SysAdmin", "OrgAdmin"],
        isAnonymous: false,
      },
    ],
  },
];

const siteReferenceRoutes = [
  {
    path: "references/chart",
    name: "Site References",
    element: SiteRefChart,
    roles: ["SysAdmin", "HiringAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const educationRoutes = [
  {
    path: "/user/education/create",
    name: "UsersEducation",
    header: "Navigation",
    element: AddUserEducation,
    roles: ["Candidate"],
    exact: true,
    isAnonymous: false,
  },
];

const newsletterRoutes = [
  {
    path: "/newsletters/new",
    name: "Newsletters",
    header: "Navigation",
    element: AddNewsletterForm,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const schoolRoutes = [
  {
    path: "/schools/new",
    name: "Add School",
    header: "",
    element: AddSchool,
    roles: ["Candidate", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/schools/paged",
    name: "School List",
    header: "",
    element: PagedSchools,
    roles: ["Candidate", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/schools/:id",
    name: "Edit School",
    header: "",
    element: AddSchool,
    roles: ["Candidate", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const skillRoutes = [
  {
    path: "/skills/add",
    name: "Skills",
    element: SkillForm,
    roles: ["SysAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/skills/list",
    name: "Skills",
    element: SkillList,
    roles: ["SysAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/skills/:id/edit",
    name: "Edit Skill",
    element: SkillForm,
    roles: ["SysAdmin"],
    exact: true,
    inAnonymous: false,
  },
];

const personalValuesRankingRoutes = [
  {
    path: "/dashboard/personalvalues/ranking",
    name: "PersonalValuesRanking",
    header: "",
    children: [
      {
        path: "/dashboard/personalvalues/ranking",
        name: "PersonalValueRanking",
        element: PersonalValueRank,
        roles: ["Candidate", "SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/personalvalues/related",
        name: "RelatedPersonalValues",
        element: RelatedPersonalValues,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const jobs = [
  {
    path: "/jobs/wizard/",
    name: "New Job Posting",
    element: Jobs,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "new/posting",
    name: "Posting Page",
    element: NewJobPosting,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/hiring/admin/dashboard",
    name: "Hiring Admin Dashboard",
    element: JobsPage,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "dashboard/jobs/education/add",
    name: "Education Requirements",
    header: "Navigation",
    element: EducationRequirements,
    roles: ["HiringAdmin"],
  },
  {
    path: "dashboard/jobs/skills",
    name: "Job Skills",
    header: "Job Skills",
    element: JobSkills,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "jobs/candidate/:candidateId/skills",
    name: "User Skills List",
    header: "User Skills List",
    element: UserSkillsList,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/joblinks",
    name: "Job Links",
    exact: true,
    element: JobLinks,
    roles: ["OrgAdmin"],
    isAnonymous: false,
  },
];

const files = [
  {
    path: "/dashboard/files",
    name: "Files",
    element: FileManagerMain,
    isAnonymous: false,
    exact: false,
    roles: ["SysAdmin"],
  },
  {
    path: "/dashboard/resume",
    name: "PDF Viewer",
    element: PdfWizard,
    isAnonymous: false,
    exact: false,
    roles: ["OrgAdmin", "HiringAdmin", "Candidate"],
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
  },
];

const faqFormRoutes = [
  {
    path: "/faqs/new",
    name: "Frequently Asked Questions",
    header: "FAQ",
    element: FaqForm,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/faqs/:id/edit",
    name: "Frequently Asked Questions Edit",
    header: "FAQ",
    element: FaqForm,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const appointmentRoutes = [
  {
    path: "/appointments/list",
    name: "Appointments List",
    element: Appointments,
    roles: ["Candidate", "HiringAdmin", "OrgAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments/new",
    name: "Create Appointment Form",
    element: AppointmentForm,
    roles: ["HiringAdmin", "SysAdmin", "OrgAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments/:id",
    name: "Update Appointment Form",
    element: AppointmentForm,
    roles: ["HiringAdmin", "SysAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },
];

const surveyRoutes = [
  {
    path: "/surveys/",
    name: "Surveys",
    element: Surveys,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
    children: [
      {
        path: "/surveys/builder",
        name: "Survey Builder",
        element: SurveyBuilder,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const compensationPackageRoutes = [
  {
    path: "jobs/compensations/packages/add",
    name: "Add Compensation Package",
    element: CompensationPackageForm,
    roles: ["HiringAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "jobs/compensations/packages/edit",
    name: "Edit Compensation Package",
    element: CompensationPackageForm,
    roles: ["HiringAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "jobs/compensations/packages",
    name: "Compensation Packages",
    element: CompensationsDashboard,
    roles: ["HiringAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "jobs/compensations/elements",
    name: "Compensation Package Dashboard",
    element: CompensationElementForm,
    roles: ["HiringAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/jobs/compensations/configuration",
    name: "Compensation Configuration",
    element: CompensationConfiguration,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const donationRoutes = [
  {
    path: "/donation/charitablefund/form",
    name: "Charitable Fund Form",
    element: CharitableFundForm,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/donation/charitablefund/list",
    name: "Charitable Fund List",
    element: CharitableFundList,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/donate",
    name: "Donations",
    element: PayPalDonate,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const organizationRoutes = [
  {
    path: "/dashboard/admin/organizations/AddLocationsForm",
    name: "AddLocationsForm",
    exact: true,
    element: AddLocationsForm,
    roles: ["OrgAdmin"],
    isAnonymous: false,
  },
  {
    path: "/dashboard/admin/organizations",
    name: "Organizations List",
    element: OrganizationsList,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/admin/organizations/view",
    name: "Organizations View",
    element: OrganizationsView,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/organizations/formtool",
    name: "Organizations Form Tool",
    element: OrgFormToolPage,
    roles: ["SysAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/admin/organizations/add",
    name: "Add Form",
    element: OrganizationsForm,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/organizations/dash",
    name: "Organization Dash Home",
    element: OrganizationDash,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
const blogRoutes = [
  {
    path: "/blogs/add",
    name: "Blogs",
    element: Blog,
    roles: ["Candidate", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const locationRoutes = [
  {
    path: "/dashboard/locations/add",
    name: "Add New Location",
    element: LocationForm,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "dashboard/locations/{:id}/edit",
    name: "Edit Location",
    element: LocationForm,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/locations/multiple",
    name: "Edit Location",
    element: MultipleLocations,
    roles: ["Candidate", "HiringAdmin", "SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const userRoutes = [
  {
    path: "/dashboard/user",
    name: "Users Profile",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/user/education",
        name: "User Education",
        children: [
          {
            path: "/dashboard/user/education/showlist",
            name: "Show Users Education Lists",
            element: UsersEducationList,
            roles: ["Candidate", "OrgAdmin", "HiringAdmin", "SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
          {
            path: "/dashboard/user/education/create",
            name: "Create Education Record",
            element: AddUserEducation,
            roles: ["Candidate", "SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
        ],
      },
      {
        path: "/dashboard/users/demographics/edit",
        name: "User Demographics",
        element: UserDemographics,
        roles: ["Candidate"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/user/skills",
        name: "User Skills",
        children: [
          {
            path: "/user/skills/new",
            name: "Add Skill",
            element: UserSkillsForm,
            roles: ["Candidate", "SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
          {
            path: "/user/skills/:id",
            name: "Update Skill",
            element: UserSkillsForm,
            roles: ["Candidate", "SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
          {
            path: "user/skills/:userId/:skillId",
            name: "Delete Skill",
            element: UserSkillsForm,
            roles: ["Candidate", "SysAdmin"],
            exact: true,
            isAnonymous: false,
          },
          {
            path: "/user/skills/list",
            name: "Skills List View",
            element: UserSkillsList,
            roles: ["Candidate", "SysAdmin", "HiringAdmin"],
            exact: true,
            isAnonymous: false,
          },
        ],
      },
    ],
  },
];

const candidateRoutes = [
  {
    path: "/candidates/resume",
    name: "Resume Wizard",
    element: ResumeWizard,
    roles: ["Candidate"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/candidates/resume/create",
    name: "Saved Resumes",
    element: ResumeWizard,
    roles: ["Candidate"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/candidate/locations/form",
    name: "Candidate Locations",
    element: CandidateLocationsForm,
    roles: ["Candidate"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/candidate/locations/:id/edit",
    name: "Edit Candidate Locations",
    element: CandidateLocationsForm,
    roles: ["Candidate"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/candidate/locations",
    name: "Candidate Locations",
    element: CandidateLocations,
    roles: ["Candidate"],
    exact: true,
    inAnonymous: false,
  },
];

const commentRoutes = [
  {
    path: "/comments",
    name: "Add New Comment",
    exact: true,
    element: CommentsExample,
    roles: ["Candidate", "SysAdmin", "User"],
    isAnonymous: false,
  },
  {
    path: "/comments/add",
    name: "Add New Comment",
    exact: true,
    element: CommentForm,
    roles: ["Candidate", "SysAdmin"],
    isAnonymous: false,
  },

  {
    path: "/comment/{:id}",
    name: "Edit Comment",
    exact: true,
    element: CommentForm,
    roles: ["Candidate", "SysAdmin"],
    isAnonymous: false,
  },
];
const userSettingsRoutes = [
  {
    path: "/dashboard/settings",
    name: "User Settings",
    header: "Navigation",
    element: UserSettings,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },
];
const candidateDashboardRoutes = [
  {
    path: "/dashboards/candidate",
    name: "Candidate Profile",
    header: "Navigation",
    element: CandidateProfile,
    roles: ["Candidate"],
    exact: true,
    isAnonymous: false,
  },
];
const organizationMembersRoutes = [
  {
    path: "/admin/organization/members/list",
    name: "Organization Members List",
    element: OrgMembersList,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    inAnonymous: false,
  },
  {
    path: "/admin/organization/members/add",
    name: "Add Organization Members",
    element: OrgMemberInviteForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    inAnonymous: false,
  },
];

const licenseRoutes = [
  {
    path: "/licenses",
    name: "Licenses",
    header: "Licenses",
    children: [
      {
        path: "/licenses",
        name: "LicensesList",
        element: LicensesList,
        roles: ["Candidate", "SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/licenses/add",
        name: "Add New License",
        element: LicenseForm,
        roles: ["Candidate", "SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/licenses/:id/edit",
        name: "Update License",
        element: LicenseForm,
        roles: ["Candidate", "SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];
const goalsRoutes = [
  {
    path: "/goals",
    name: "Goals",
    element: Goals,
    roles: ["OrgAdmin", "HiringAdmin", "SysAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/goals/form",
    name: "Add New Goal",
    element: GoalForm,
    roles: ["Candidate"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/goals/:id/form",
    name: "Edit Goal",
    element: GoalForm,
    roles: ["Candidate"],
    exact: true,
    isAnonymous: false,
  },
];
const teamRoutes = [
  {
    path: "/teams/add",
    name: "Teams Form",
    element: TeamsForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/teams",
    name: "Teams List",
    element: TeamsList,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const venueRoutes = [
  {
    path: "/venues",
    name: "Venues",
    header: "Routes",
    element: Venues,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
    exact: true,
    isAnonymous: false,
  },

  {
    path: "/venues/add",
    name: "Venues Add",
    element: VenuesForm,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },

  {
    path: "/venues/:id/edit",
    name: "Venues Edit",
    element: VenuesForm,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },

  {
    path: "/venues/admin",
    name: "Venues",
    element: VenuesAdminView,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
const shareStoriesFormRoutes = [
  {
    path: "/sharestories/add",
    name: "Share Your Success Story",
    exact: true,
    element: ShareStoriesForm,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
    isAnonymous: false,
  },
];

const forumsRoutes = [
  {
    path: "/forums/form",
    name: "Form for Forums",
    exact: true,
    element: ForumsForm,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 400",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const allRoutes = [
  ...appointmentRoutes,
  ...blogRoutes,
  ...candidateRoutes,
  ...candidateDashboardRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
  ...files,
  ...jobs,
  ...newsletterRoutes,
  ...organizationRoutes,
  ...personalValuesRankingRoutes,
  ...schoolRoutes,
  ...surveyRoutes,
  ...organizationRoutes,
  ...organizationMembersRoutes,
  ...donationRoutes,
  ...blogRoutes,
  ...licenseRoutes,
  ...locationRoutes,
  ...commentRoutes,
  ...compensationPackageRoutes,
  ...chatRoutes,
  ...userRoutes,
  ...educationRoutes,
  ...siteReferenceRoutes,
  ...userSettingsRoutes,
  ...candidateRoutes,
  ...teamRoutes,
  ...goalsRoutes,
  ...faqFormRoutes,
  ...skillRoutes,
  ...venueRoutes,
  ...externallinkRoutes,
  ...shareStoriesFormRoutes,
  ...forumsRoutes,
];

export default allRoutes;
