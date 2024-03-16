using Models.Requests.Comments;
using System.Collections.Generic;
using System;
using Models.Domain.Comment;

namespace Services.Interfaces
{
    public interface ICommentService
    {
        int Add(CommentAddRequest model, int userId);
        List<Comment> Get(int entityId, int entityTypeId);
        List<Comment> GetNestedComments(int entityId, int entityTypeId);
        void Update(CommentUpdateRequest model, int userId);
        void UpdateIsDeleted(int id, int userId);

    }
}