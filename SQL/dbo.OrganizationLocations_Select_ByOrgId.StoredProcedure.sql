GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationLocations_Select_ByOrgId]

		@OrganizationId int


/*--test---

		declare @OrganizationId int = 11

		execute [dbo].[OrganizationLocations_Select_ByOrgId]

		@OrganizationId

		select *
		from dbo.OrganizationLocations

		select *
		from dbo.Organizations
	

*/
as

begin

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

				WHERE orgloc.[OrganizationId] = @OrganizationId 
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

							WHERE ol.[OrganizationId] = @OrganizationId 
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

							WHERE ol.[OrganizationId] = @OrganizationId 
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [State]

					,l.[Zip]
					,l.[Latitude]
					,l.[Longitude]

					FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Locations] as l
							on ol.[LocationId] = l.[Id]

						WHERE ol.[OrganizationId] = @OrganizationId 
					For JSON AUTO
			)



	FROM [dbo].[OrganizationLocations] as ol inner join [dbo].[Organizations] as o
			on [ol].[OrganizationId] = o.[Id]

	WHERE ol.[OrganizationId] = @OrganizationId 


end
GO
