package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.Configuration;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Configuration entity.
 */
public interface ConfigurationRepository extends JpaRepository<Configuration,Long> {

}
