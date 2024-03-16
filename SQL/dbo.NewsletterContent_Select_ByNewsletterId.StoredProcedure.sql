GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[NewsletterContent_Select_ByNewsletterId]
														@NewsletterId int 
	as
/*	
		DECLARE @NewsletterId int = 1

		EXECUTE dbo.NewsletterContent_Select_ByNewsletterId
														@NewsletterId 
*/
	BEGIN

			SELECT c.[Id] as ContentId
				  ,k.Id as KeyId
				  ,k.KeyName
				  ,k.TemplateId
				  ,kt.Id
				  ,kt.[Name]
				  ,c.[NewsletterId]
				  ,c.[Value]
				  ,c.[DateCreated]
				  ,c.[DateModified]
				  ,u.id
				  ,u.FirstName
				  ,u.LastName
				  ,u.Mi
				  ,u.AvatarUrl
			  FROM [dbo].[NewsletterContent] as c
					inner join dbo.NewsletterTemplateKeys as k
							on c.TemplateKeyId = k.Id
					inner join dbo.NewsletterKeyTypes as kt
							on k.KeyTypeId = kt.Id
					left join [dbo].[Users] u
							on c.CreatedBy = u.Id 
			  WHERE NewsletterId = @NewsletterId

END
GO
