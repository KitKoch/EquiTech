using Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.DesignatedSurveys
{
    public class DesignatedSurveyAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }
        [AllowNull]
        public string Version { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int WorkflowType { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int SurveyId { get; set; }
        [AllowNull]
        public int EntityType { get; set; }
        [AllowNull]
        public int EntityId { get; set; }
        [AllowNull]
        public bool isDeleted { get; set; }

    }
}
