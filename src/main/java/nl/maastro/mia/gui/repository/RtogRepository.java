package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.Rtog;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Rtog entity.
 */
public interface RtogRepository extends JpaRepository<Rtog,Long> {

}
