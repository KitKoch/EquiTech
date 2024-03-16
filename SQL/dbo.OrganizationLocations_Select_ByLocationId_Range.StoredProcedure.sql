GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationLocations_Select_ByLocationId_Range]

		@PageIndex int
		,@PageSize int
		,@LocationId int
		


/*--test---

	Declare	@PageIndex int = 0
	,@PageSize int = 3
	,@LocationId int = 11


	execute [dbo].[OrganizationLocations_Select_ByLocationId_Range]
	
	@PageIndex
	,@PageSize
	,@LocationId

	select *
	from dbo.OrganizationLocations

	select *
	from dbo.Organizations

	select *
	from dbo.Locations


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

				WHERE ol.[LocationId] = @LocationId 
						For JSON AUTO
					)

			,o.[Name]
			,o.[Headline]
			,o.[Description]
			,o.[Logo]
			,o.[Phone]
			,o.[SiteUrl]

			,[Locations] = (
			
					SELECT

					JSON_QUERY ((

						SELECT

						lt.[Id]
						,lt.[Name]

						FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Locations] as l
								on ol.[LocationId] = l.[Id]
							inner join [dbo].[LocationTypes] as lt
								on l.[LocationTypeId] = lt.[Id]

						WHERE ol.[LocationId] = @LocationId
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

						WHERE ol.[LocationId] = @LocationId 
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [State]

					,l.[Zip]
					,l.[Latitude]
					,l.[Longitude]


					FROM [dbo].[OrganizationLocations] as orgloc inner join [dbo].[Locations] as l
							on ol.[LocationId] = l.[Id]

					WHERE orgloc.[LocationId] = @LocationId AND orgloc.OrganizationId = ol.OrganizationId
					For JSON AUTO
			)
			,TotalCount = Count(1) OVER()
			


	FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Organizations] as o
			on [ol].[OrganizationId] = o.[Id]

	WHERE ol.[LocationId] = @LocationId


	order by ol.[DateCreated]
	offset @offset rows
	fetch next @PageSize rows only


end
GO
