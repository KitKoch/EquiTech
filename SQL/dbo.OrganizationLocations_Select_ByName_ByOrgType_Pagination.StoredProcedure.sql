GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[OrganizationLocations_Select_ByName_ByOrgType_Pagination]

		@PageIndex int
		,@PageSize int
		,@NameQuery nvarchar(200)
		,@OrganizationTypeId int
		


/*--test---


	Declare	@PageIndex int = 0
	,@PageSize int = 10
	,@NameQuery nvarchar(200) = ''
	,@OrganizationTypeId int = 0


	execute [dbo].[OrganizationLocations_Select_ByName_ByOrgType_Pagination]
	
	@PageIndex
	,@PageSize
	,@NameQuery
	,@OrganizationTypeId


*/
as

begin
	declare @offset int = @PageIndex * @PageSize

SELECT 
			
			ol.[OrganizationId]
			,[OrganizationType] = (

				SELECT

				ot.[Id]
				,ot.[Name]

				FROM [dbo].[OrganizationLocations] as orgloc inner join [dbo].Organizations as o
						on o.Id = orgloc.OrganizationId
					inner join [dbo].[OrganizationTypes] as ot
						on o.[OrganizationTypeId] = ot.[Id]

				WHERE ol.[OrganizationId] = orgloc.[OrganizationId]
						For JSON AUTO
					)

			,o.[Name]
			,o.[Headline]
			,o.[Description]
			,o.[Logo]
			,o.[Phone]
			,o.[SiteUrl]
			,o.[IsValidated]
			,o.[DateCreated]
			,o.[DateModified]
			,[JobCount] = (
						
						SELECT Count(j.[OrganizationId])

						FROM [dbo].[Jobs] as j
						WHERE j.[OrganizationId] = o.[Id]

					)

			,[Location] = (
			
					SELECT

					JSON_QUERY ((

						SELECT

						lt.[Id]
						,lt.[Name]

						FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Locations] as l
								on ol.[LocationId] = l.[Id]
							inner join [dbo].[LocationTypes] as lt
								on l.[LocationTypeId] = lt.[Id]

						WHERE ol.[OrganizationId] = orgloc.[OrganizationId]
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [LocationType]

					,l.[Id]
					,l.[LineOne]
					,l.[LineTwo]
					,l.[City]

					,JSON_QUERY ((

						SELECT

						s.[Id]
						,s.[Name]
						,s.[Code] as [Col3]

						FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Locations] as l
								on ol.[LocationId] = l.[Id]
							inner join [dbo].[States] as s
								on l.[StateId] = s.[Id]

						WHERE ol.[OrganizationId] = orgloc.[OrganizationId]
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [State]

					,l.[Zip]
					,l.[Latitude]
					,l.[Longitude]
					,l.[DateCreated]
					,l.[DateModified]


					FROM [dbo].[OrganizationLocations] as orgloc inner join [dbo].[Locations] as l
							on ol.[LocationId] = l.[Id]

					WHERE ol.[OrganizationId] = orgloc.[OrganizationId]
					For JSON AUTO
			)
			,TotalCount = Count(1) OVER()
			


	FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Organizations] as o
			on [ol].[OrganizationId] = o.[Id]

	WHERE (o.[Name] LIKE '%' + @NameQuery + '%') AND o.OrganizationTypeId = (CASE WHEN @OrganizationTypeId > 0 THEN @OrganizationTypeId ELSE o.OrganizationTypeId END)

	order by o.[Id]
	offset @offset rows
	fetch next @PageSize rows only


end
GO
