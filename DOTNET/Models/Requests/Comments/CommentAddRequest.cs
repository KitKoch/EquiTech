using Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Models.Requests.Comments
{
	public class CommentAddRequest
	{
		[Required]
		[StringLength(1000, MinimumLength = 2)]
		public string Subject { get; set; }

		[Required]
		[StringLength(1000, MinimumLength = 2)]
		public string Text { get; set; }

		[AllowNull]
		public int? ParentId { get; set; }

		[Required]
		[Range(1, int.MaxValue)]
		public int EntityTypeId { get; set; }

		[Required]
		[Range(1, int.MaxValue)]
		public int EntityId { get; set; }

	}
}
