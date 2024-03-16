GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	CREATE PROC [dbo].[NewsletterTemplates_SelectAll_V2]
											 @PageIndex int
											,@PageSize int

	as
/*
		DECLARE  @PageIndex int = 0
				,@PageSize int = 10

		EXECUTE dbo.NewsletterTemplates_SelectAll
												 @PageIndex
												,@PageSize

												select *
												from dbo.users

*/
	BEGIN

			DECLARE @OffSet int = @PageSize * @PageIndex

			SELECT t.[Id] as TemplateId
				  ,t.[Name]
				  ,t.[Description]
				  ,t.[PrimaryImage]
				  ,t.[DateCreated]
				  ,t.[DateModified]
				  ,u.id
				  ,u.FirstName
				  ,u.LastName
				  ,u.Mi
				  ,u.AvatarUrl
				  ,TemplateKeys = (
								   SELECT k.Id as KeyId
										 ,k.KeyName
										 ,k.TemplateId
										 ,JSON_QUERY ((
															SELECT kt.Id
																  ,kt.[Name]
															FROM dbo.NewsletterKeyTypes as kt
															WHERE kt.Id = k.KeyTypeId
															FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
														)) as [Type]
										FROM dbo.NewsletterTemplateKeys as k 
										WHERE k.TemplateId = t.Id
										FOR JSON PATH
									)
				  ,TotalCount = count(1) over()
			FROM [dbo].[NewsletterTemplates] as t
				left join [dbo].[Users] u
						on t.CreatedBy = u.Id 
		  
			ORDER by Id
			OFFSET @Offset ROWS
			FETCH NEXT @PageSize ROWS only

	END
GO
