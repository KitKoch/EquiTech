using System;


namespace Models.Domain.DesignatedSurveys
{
    public class DesignatedSurvey
    {
        public int DesignatedSurveyId { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public int WorkflowTypeId { get; set; }
        public int SurveyId { get; set; }
        public int EntityType { get; set; }
        public int EntityId { get; set; }
        public bool IsDeleted { get; set; }
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
