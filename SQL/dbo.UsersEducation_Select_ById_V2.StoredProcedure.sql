GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[UsersEducation_Select_ById_V2]
										@Id int
	as
/*------------ TEST CODE ------------

		DECLARE @Id int = 102

		EXECUTE dbo.UsersEducation_Select_ById_V2
											@Id 
*/
	BEGIN

		SELECT ue.[Id]
			  ,s.[Id] as schoolId
			  ,s.[Name] as schoolName
			  ,l.[LineOne] 
			  ,l.[LineTwo] 
			  ,l.[City]
			  ,st.[Name] as State
			  ,l.[Zip]
			  ,s.[LogoUrl]
			  ,s.[isDeleted]
			  ,s.[isVerified]
			  ,u.Id
			  ,u.FirstName
			  ,u.LastName
			  ,u.AvatarUrl
			  ,uu.Id
			  ,uu.FirstName
			  ,uu.LastName
			  ,uu.AvatarUrl
			  ,s.[DateCreated]
			  ,s.[DateModified]
			  ,el.[Id] as educationalLevelId
			  ,el.[Name] as educationalLevel
			  ,d.[Id] as degreeId
			  ,d.[Name] as degree
			  ,ue.[Description]
			  ,ue.[IsDeleted]
			  ,ue.[StartDate]
			  ,ue.[EndDate]
			  ,ue.[CreatedBy]
			  ,ue.[ModifiedBy]
			  ,ue.[DateCreated]
			  ,ue.[DateModified]
		  FROM [dbo].[UsersEducation] as ue 
					left join [dbo].[Schools] as s
							on ue.[SourceId] = s.Id
					left join [dbo].[Locations] as l
							on s.LocationId = l.Id
					left join [dbo].[States] as st
							on l.StateId = st.Id
					left join [dbo].[Users] u
							on s.CreatedBy = u.Id 
					left join [dbo].[Users] uu
							on s.ModifiedBy = uu.Id 
					inner join [dbo].[EducationLevels] as el
							on ue.EducationalLevelId = el.Id
					left join [dbo].[Degrees] as d
							on ue.DegreeId = d.Id
			WHERE ue.Id = @Id

	END
GO
