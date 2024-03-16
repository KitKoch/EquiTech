GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Newsletters_SelectAll_V4]
								 @PageIndex int	
								,@PageSize int		
AS

/*

	
		DECLARE  @PageIndex int	= 0
				,@PageSize int = 5	

		EXECUTE dbo.Newsletters_SelectAll_V4
									@PageIndex 	
									,@PageSize 		

*/

	BEGIN

		DECLARE @OffSet int = @PageIndex * @PageSize

			SELECT n.[Id]
				  ,t.Id as TemplateId
				  ,t.[Name]
				  ,t.[Description]
				  ,t.[PrimaryImage]
				  ,t.[DateCreated]
				  ,t.[DateModified]
				  ,uu.id
				  ,uu.FirstName
				  ,uu.LastName
				  ,uu.Mi
				  ,uu.AvatarUrl
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
				  ,n.[CategoryId]
				  ,nc.[Name] as Category
				  ,n.[Description]
				  ,n.[Name]
				  ,n.[CoverPhoto]
				  ,n.[isSubscribed]
				  ,Content = (
								SELECT c.Id as ContentId
									 ,JSON_QUERY((
													 SELECT  k.Id as KeyId
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
													 WHERE k.Id = c.TemplateKeyId
													 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
												  )) as TemplateKey
									  ,c.NewsletterId
									  ,c.[Value]
									  ,c.[DateCreated]
									  ,c.[DateModified]
									  ,JSON_QUERY((
													 SELECT  uuu.Id
															,uuu.FirstName
															,uuu.LastName
															,uuu.Mi
															,uuu.AvatarUrl
													 FROM [dbo].[Users] as uuu
													 WHERE uuu.Id = c.CreatedBy
													 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
												 )) as CreatedBy
								FROM dbo.NewsletterContent as c 										
								WHERE c.NewsletterId = n.Id 
								FOR JSON PATH
							 )				   
				  ,n.[DateToPublish]
				  ,n.[DateToExpire]
				  ,n.[DateCreated]
				  ,n.[DateModified]
				  ,u.id
				  ,u.FirstName
				  ,u.LastName
				  ,u.Mi
				  ,u.AvatarUrl
				  ,TotalCount = Count(*) over()
			 FROM [dbo].[Newsletters] as n 
					left join dbo.NewsletterTemplates as t
							on n.TemplateId = t.Id
					left join [dbo].[Users] u
							on n.CreatedBy = u.Id 
					left join [dbo].[Users] uu
							on n.CreatedBy = uu.Id 
					inner join [dbo].[NewsletterCategories] as nc
							on n.CategoryId = nc.Id 
			  ORDER BY n.Id
			  OFFSET @OffSet ROWS
			  FETCH NEXT @PageSize ROWS ONLY

	END
GO
