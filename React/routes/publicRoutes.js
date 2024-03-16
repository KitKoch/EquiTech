import { lazy } from "react";

const Reviews = lazy(() => import("../components/ratings/Reviews"));
const TakeSurvey = lazy(() => import("../components/surveys/TakeSurvey"));
const Landing = lazy(() => import("../pages/landing/Landing"));
const PageNotFound = lazy(() => import("../components/errors/Error404"));
const NewsletterSubscriptionForm = lazy(() =>
  import("../components/newsletters/subscriptions/SubscribeForm")
);
const UnsubscribePage = lazy(() =>
  import("../components/newsletters/subscriptions/UnsubscribePage")
);
const Checkout = lazy(() => import("../components/stripe/CheckOutButton"));
const StripeOrderSuccess = lazy(() =>
  import("../components/stripe/StripeOrderSuccessPage")
);
const SiteReferences = lazy(() =>
  import("../components/sitereferences/SiteReferences")
);
const Pricing = lazy(() => import("../pages/pricing/Pricing"));
const SignUp = lazy(() => import("../components/users/SignUp"));
const SignIn = lazy(() => import("../components/users/SignIn"));
const BlogsPage = lazy(() => import("../components/blogs/BlogsPage"));
const FileUploadExample = lazy(() =>
  import("../components/fileupload/FileUploadExample")
);
const Newsletter = lazy(() => import("../components/newsletters/Newsletter"));
const Podcast = lazy(() => import("../components/podcasts/Podcasts"));
const NewPodcast = lazy(() => import("../components/podcasts/NewPodcastForm"));
const AboutUs = lazy(() => import("../components/aboutus/AboutUs"));
const ResetPassword = lazy(() =>
  import("../pages/resetpassword/ResetPassword")
);
const ChangePassword = lazy(() =>
  import("../pages/changepassword/ChangePassword")
);

const JobSearch = lazy(() => import("../components/jobsearch/JobSearch"));
const JobDetails = lazy(() => import("../components/jobsearch/JobDetails"));
const ContactUs = lazy(() => import("../components/contactus/ContactUs"));
const WorkHistory = lazy(() => import("../pages/workhistory/UserWorkHistory"));
const Venues = lazy(() => import("../components/venues/Venue"));
const ViewFaqs = lazy(() => import("../components/faq/Faq"));
const ShareStories = lazy(() =>
  import("../components/sharestories/ShareStories")
);
const InviteSignUp = lazy(() => import("../components/invites/InviteSignUp"));
const CookiesPolicy = lazy(() =>
  import("../components/cookiespolicy/CookiesPolicy")
);
const PrivacyPolicy = lazy(() =>
  import("../components/privacypolicy/PrivacyPolicy")
);

const ShareStoriesSeeMore = lazy(() =>
  import("../components/sharestories/ShareStoriesSeeMore")
);
const ForumView = lazy(() => import("../components/forums/ForumView"));
const ForumThreadById = lazy(() =>
  import("../components/forums/ForumThreadById")
);
const ThreadResponse = lazy(() =>
  import("../components/forums/ThreadResponse")
);
const SingleBlogView = lazy(() => import("../components/blogs/SingleBlogView"));

const routes = [
  {
    path: "/forums",
    name: "Forums View",
    exact: true,
    element: ForumView,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/forums/:forumId",
    name: "Thread By Forum Id",
    exact: true,
    element: ForumThreadById,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/forums/thread/:parentId",
    name: "Thread By Forum Id",
    exact: true,
    element: ThreadResponse,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newsletters",
    name: "newsletters",
    exact: true,
    element: Newsletter,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/pricing",
    name: "pricing",
    exact: true,
    element: Pricing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/checkout",
    name: "checkout",
    exact: true,
    element: Checkout,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/order/success",
    name: "checkout",
    exact: true,
    element: StripeOrderSuccess,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/fileComponent",
    name: "files",
    element: FileUploadExample,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/newsletters/subscribe",
    name: "Subscribe to Newsletter",
    element: NewsletterSubscriptionForm,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/newsletters/unsubscribe",
    name: "Unsubscribe from our Newsletter",
    element: UnsubscribePage,
    roles: [],
    exact: true,
    isAnonymous: true,
  },

  {
    path: "/auth/signup",
    name: "SignUp",
    exact: true,
    element: SignUp,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/take/:id/survey",
    name: "Surveys",
    element: TakeSurvey,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    exact: true,
    element: SignIn,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/reviews",
    name: "Reviews",
    element: Reviews,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/references",
    name: "SiteReferences",
    exact: true,
    element: SiteReferences,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/faqs",
    name: "View Faqs",
    exact: true,
    element: ViewFaqs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/blogs",
    name: "Fairly Blogs",
    element: BlogsPage,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/blogs/:id",
    name: "Fairly Blogs",
    element: SingleBlogView,
    roles: [],
    exact: false,
    isAnonymous: false,
  },
  {
    path: "/aboutus",
    name: "About Us",
    exact: true,
    element: AboutUs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/workhistory",
    name: "User Work History",
    element: WorkHistory,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/privacypolicy",
    name: "Privacy Policy",
    element: PrivacyPolicy,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/cookiespolicy",
    name: "Cookies Policy",
    element: CookiesPolicy,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/invite",
    name: "Invite SignUp",
    element: InviteSignUp,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/jobs/search",
    name: "Job Search",
    element: JobSearch,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/jobs/search/:id/details",
    name: "Job Details",
    element: JobDetails,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/venues/public",
    name: "Fairly Venues",
    element: Venues,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/sharestories",
    name: "Success Stories",
    exact: true,
    element: ShareStories,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/sharestories/:id/seemore",
    name: "See More of This Story",
    exact: true,
    element: ShareStoriesSeeMore,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/policy/cookies",
    name: "Cookies Policy",
    exact: true,
    element: CookiesPolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "policy/privacy",
    name: "Privacy Policy",
    exact: true,
    element: PrivacyPolicy,
    roles: [],
    isAnonymous: true,
  },
];
const podcastRoutes = [
  {
    path: "/podcasts",
    name: "Podcast",
    exact: true,
    element: Podcast,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
    isAnonymous: true,
  },
  {
    path: "/podcasts/new",
    name: "New Podcast",
    exact: true,
    element: NewPodcast,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin"],
    isAnonymous: true,
  },
  {
    path: "/podcasts/:id/edit",
    name: "Update Podcast",
    exact: true,
    element: NewPodcast,
    roles: ["SysAdmin", "OrgAdmin", "HiringAdmin"],
    isAnonymous: true,
  },
  {
    path: "/contactus",
    name: "Contact Us",
    exact: true,
    element: ContactUs,
    roles: [],
    isAnonymous: true,
  },
];

const passwordRoutes = [
  {
    path: "/resetpassword",
    name: "reset password",
    exact: true,
    element: ResetPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/changepassword",
    name: "change password",
    exact: true,
    element: ChangePassword,
    roles: [],
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 400",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

let allRoutes = [
  ...routes,
  ...errorRoutes,
  ...podcastRoutes,
  ...passwordRoutes,
];

export default allRoutes;
