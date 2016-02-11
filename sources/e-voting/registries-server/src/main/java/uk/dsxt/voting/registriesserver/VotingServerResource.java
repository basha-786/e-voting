/******************************************************************************
 * e-voting system                                                            *
 * Copyright (C) 2016 DSX Technologies Limited.                               *
 *                                                                            *
 * This program is free software; you can redistribute it and/or modify       *
 * it under the terms of the GNU General Public License as published by       *
 * the Free Software Foundation; either version 2 of the License, or          *
 * (at your option) any later version.                                        *
 *                                                                            *
 * This program is distributed in the hope that it will be useful,            *
 * but WITHOUT ANY WARRANTY; without even the implied                         *
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.           *
 * See the GNU General Public License for more details.                       *
 *                                                                            *
 * You can find copy of the GNU General Public License in LICENSE.txt file    *
 * at the top-level directory of this distribution.                           *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

package uk.dsxt.voting.registriesserver;

import lombok.extern.log4j.Log4j2;
import uk.dsxt.voting.common.datamodel.BlackListEntryJSON;
import uk.dsxt.voting.common.datamodel.VoterJSON;
import uk.dsxt.voting.common.datamodel.VotingJSON;
import uk.dsxt.voting.common.datamodel.VotingRightJSON;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Log4j2
@Path("/voting-api")
public class VotingServerResource {
    private final VotingServerManager manager;

    public VotingServerResource(VotingServerManager manager) {
        this.manager = manager;
    }

    @GET
    @Path("/votingRights")
    @Produces("application/json")
    public VotingRightJSON[] getVotingRights() {
        return manager.getVotingRights();
    }

    @GET
    @Path("/voters")
    @Produces("application/json")
    public VoterJSON[] getVoters() {
        return manager.getVoters();
    }

    @GET
    @Path("/voting")
    @Produces("application/json")
    public VotingJSON getVoting() {
        return manager.getVoting();
    }

    @GET
    @Path("/blackList")
    @Produces("application/json")
    public BlackListEntryJSON[] getBlackList() {
        return manager.getBlackList();
    }
}
